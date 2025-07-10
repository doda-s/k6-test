import { check } from 'k6'
import http from 'k6/http'
import { apiAddress } from './script.js'
import { formId } from './create-form.js'

export function testUpdateForm() {
    const params = {
        tags: {
            name: `${apiAddress}/forms/update`,
        },
    }
    const payload = JSON.stringify({
        name: "K6 Update Test",
        age: 100,
        gender: "Update test"
    })
    const res = http.put(`${apiAddress}/forms/update/${formId}`, payload, params)
    check(res, { 'update form successfully': (r) => r.status==200 })
}