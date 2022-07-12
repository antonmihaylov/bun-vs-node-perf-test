import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "1m", target: 100 },
  ],
};

export default function () {
  const res = http.get("http://localhost:4000");
}
