import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  console.log('formData ', formData)
  const file = formData.get('file') as File;
  const fileType = formData.get('fileType');
  const fileName = formData.get('fileName');

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
  }
  if (typeof fileType !== 'string' || typeof fileName !== 'string') {
    return new Response(JSON.stringify({ error: 'fileType 和 fileName 必须为字符串' }), { status: 400 });
  }

  // 读取文件内容
  const arrayBuffer = await file.arrayBuffer();
  const nodeFile = new File([arrayBuffer], fileName, { type: fileType });

  // console.log('nodeFile ', nodeFile)

  // 动态导入 Google GenAI SDK
  const { GoogleGenAI } = await import('@google/genai');
  const agentRuntime = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
  });

  // console.log('agentRuntime apiKey ', process.env.GOOGLE_API_KEY)
  // console.log('agentRuntime ', agentRuntime)

  console.log('agentRuntime ', agentRuntime.files.upload)

  let googleResult: any = null;
  try {
    // 上传到 Google GenAI
    googleResult = await agentRuntime.files.upload({
      file: nodeFile,
      config: {
        mimeType: fileType,
      },
    });

    console.log('googleResult ', googleResult)
  } catch (err) {
    console.log('google err ', err)
  }

  if (nodeFile.size >= (30 * Math.pow(1024, 2))) {
    await new Promise((resolve) => setTimeout(resolve, 60000));
  }

  return new Response(
    JSON.stringify({
      message: '上传并转存 Google GenAI 成功',
      googleResult: googleResult?.uri,
    }),
    { status: 200 }
  );
}