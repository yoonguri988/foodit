const API_NUM = 1717;
export async function getFoods({ order = "createdAt" }) {
  const response = await fetch(
    `https://learn.codeit.kr/${API_NUM}/foods?order=${order}`
  );
  const body = await response.json();
  return body;
}
