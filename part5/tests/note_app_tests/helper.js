const loginWith = async (page, username, password) => {
    await page.getByRole('button', { name: 'Login'}).click()
    await page.getByTestId('username').fill('test')
    await page.getByTestId('password').fill('pw123')

    await page.getByRole('button', { name: 'Login' }).click()
}

const createNote = async (page, content) => {
    await page.getByRole('button', { name: 'New Note' }).click()
    await page.getByRole('textbox').fill(content)
    await page.getByRole('button', { name: 'save' }).click()
    await page.getByText(content).waitFor()
}

export { loginWith, createNote }