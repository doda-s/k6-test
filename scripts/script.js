import { testGetFormsList } from './get-forms-list.js'
import { testCreateForm } from './create-form.js'
import { testDeleteForm } from './delete-form.js'
import { testUpdateForm } from './update-form.js'

export const apiAddress = 'http://api:8000'

export const options = {
  stages: [
    { duration: '15s', target: 10 },
    { duration: '15s', target: 50 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 200 },
    { duration: '60s', target: 500 },
    { duration: '60s', target: 1000 },
  ]
}

export default function () {
  testGetFormsList()
  testCreateForm()
  testUpdateForm()
  testDeleteForm()
}