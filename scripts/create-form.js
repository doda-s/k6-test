import { check } from 'k6'
import http from 'k6/http'
import { apiAddress } from './script.js'

export var formId

export function testCreateForm() {
    const payload = JSON.stringify({
        name: "K6 User Test",
        age: 100,
        gender: "Test"
    })

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    
    const res = http.post(`${apiAddress}/forms/new`, payload, params)
    formId = res.json().form.id
    check(res, { 'form successfully created': (r) => r.status == 200 })
}