const API_NUM = 1717;
const ADDRESS = `https://learn.codeit.kr/${API_NUM}/foods`;
export async function getFoods({
  order = "",
  cursor = "",
  limit = 10,
  search = "",
}) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}&search=${search}`;
  const response = await fetch(`${ADDRESS}?${query}`);
  if (!response.ok) {
    throw new Error(`데이터를 불러오는데 실패했습니다.`);
  }
  const body = await response.json();
  return body;
}

// 글 작성
export async function createFood(formData) {
  const response = await fetch(`${ADDRESS}`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`글을 작성하는데 실패했습니다.`);
  }
  const body = await response.json();
  return body;
}

// 글 수정하기
export async function updateFood(id, formData) {
  const response = await fetch(`${ADDRESS}/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`글을 수정하는데 실패했습니다.`);
  }
  const body = await response.json();
  return body;
}
