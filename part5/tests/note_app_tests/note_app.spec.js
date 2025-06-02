const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', () => {
  beforeEach(async({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: "Tester",
        username: "test",
        password: "pw123"
      }
    })
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
  }) 

  test('login form can be opened', async({ page }) => {
    await loginWith(page, 'test', 'pw123')
    await expect(page.getByText('Tester logged in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByTestId('username').fill('test')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', { name: 'Login' }).click()

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Tester logged in')).not.toBeVisible()

  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', 'pw123')
    })

    test('a new note can be created', async({ page }) => {
      await createNote(page, 'a note created by playwright')
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    describe('and several notes exist', () => {
      beforeEach(async({ page }) => {
        await createNote(page, 'first note')
        await createNote(page, 'second note')
        await createNote(page, 'third note')
      })

      test('one of those can be made not important', async ({ page }) => {
        const otherNoteText = await page.getByText('second note')
        const otherNoteElement = await otherNoteText.locator('..')

        await otherNoteElement
        .getByRole('button', { name: 'make not important '}).click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })
    })

  })

})
