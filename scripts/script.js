import http from 'k6/http';

export default function () {
  http.get('http://api:8000/forms');
}