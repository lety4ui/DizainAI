export async function startGeneration(photo: File, style: string, model: string, initData: string): Promise<string> {
  const formData = new FormData();
  formData.append('photo', photo);
  formData.append('style', style);
  formData.append('model', model);
  formData.append('initData', initData);

  const response = await fetch('/api/generate', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Failed to start generation');
  
  const data = await response.json();
  return data.taskId;
}

export async function sendResult(initData: string, imageUrl: string, caption: string) {
  await fetch('/api/send-result', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initData, imageUrl, caption }),
  });
}
