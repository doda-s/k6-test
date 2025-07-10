import { check } from 'k6'
import http from 'k6/http'
import { apiAddress } from './script.js'

export function testGetFormsList() {
    const res = http.get(`${apiAddress}/forms`)
    check(res, { 'get forms list successfully': (r) => r.status==200 })
}