import { check } from 'k6'
import http from 'k6/http'
import { apiAddress } from './script.js'
import { formId } from './create-form.js'

export function testDeleteForm() {
    const params = {
        tags: {
            name: `${apiAddress}/forms/delete`,
        },
    }
    const res = http.del(`${apiAddress}/forms/delete/${formId}`, null, params)
    check(res, { 'delete form successfully': (r) => r.status==200 })
}