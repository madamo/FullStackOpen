const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog, createManyBlogs } = require('./helper')
const { create } = require('../../part4/bloglist/models/user')

describe('Blog app', () => {
  beforeEach(async({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: 
        {
          name: "Tester",
          username: "test",
          password: "pw123"
        }
    })

    await request.post('/api/users', {
      data: 
        {
          name: "Tester2",
          username: "test2",
          password: "pw123"
        }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to bloglist')).toBeVisible()
  })

  describe('Login', () => {
    test('suceeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'test', 'pw123')
      await expect(page.getByText('Tester is logged in')).toBeVisible()
    })

    test('fails with the wrong credentials', async({ page }) => {
      await page.getByTestId('username').fill('test')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Tester is logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', 'pw123')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'test title', 'test author', 'someurl.com')
      await expect(page.getByText('test title test author')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'like test', 'like author', 'likeurl.com')

      await page.getByRole('button', { name: 'show' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted by the user who added it', async ({ page }) => {
      await createBlog(page, 'delete test', 'delete author', 'deleteurl.com')
      
      // click remove button and accept dialog
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()

      // expect the blog is not visible
      await expect(page.getByText('delete test by delete author')).not.toBeVisible()
    })

    test('remove button is only shown on blogs user created', async ({ page }) => {
      await page.getByRole('button', { name: 'logout' }).click()
      
      await loginWith(page, 'test2', 'pw123')

      await createBlog(page, 'user test', 'UT Auth', 'url.com')
      await page.getByText('show').waitFor()
      await expect(page.getByText('remove')).toBeVisible()

      await page.getByRole('button', { name: 'logout' }).click()

      await loginWith(page, 'test', 'pw123')
      await page.getByText('show').waitFor()

      await expect(page.getByRole('button', {name: 'remove'})).not.toBeVisible()
    })

    test('blogs are sorted by likes in descending order', async ({ page, request }) => {
      // create a set of blogs
      await createBlog(page, 'title 1', 'author 1', 'url1')
      await createBlog(page, 'title 2', 'author 2', 'url2')
      await createBlog(page, 'title 3', 'author 3', 'url3')

      // add likes to the blogs
      await page.getByRole('button', { name: 'show' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('title 1')).toBeVisible()
    })
  })
})