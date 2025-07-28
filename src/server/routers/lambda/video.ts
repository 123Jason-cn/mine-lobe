import { publicProcedure, router } from '@/libs/trpc/lambda';
import { serverDatabase } from '@/libs/trpc/lambda/middleware';
import { z } from 'zod';

const videoProcedure = publicProcedure.use(serverDatabase).use(async ({ ctx, next }) => {
  return next({
    ctx: {
      // 使用动态导入避免客户端构建时的问题
      getGoogleGenAI: async () => {
        const { GoogleGenAI } = await import('@google/genai');
        return new GoogleGenAI({
          apiKey: process.env.GOOGLE_API_KEY
        });
      }
    }
  })
});

export const videoRouter = router({
  uploadToGoogle: videoProcedure
    .input(z.object({
      // 使用 FormData 的字段名
      formData: z.any(), // FormData 对象
    }))
    .mutation(async ({ input, ctx }) => {
      console.log('input', input);
      
      // 从 FormData 中获取文件
      // const file = input.formData.get('file') as File;
      
      // if (!file) {
      //   throw new Error('No file provided');
      // }
      
      // // 动态获取 GoogleGenAI 实例
      // const agentRuntime = await ctx.getGoogleGenAI();
        
      // const googleResult: any = await agentRuntime.files.upload({
      //   file: input,
      //   config: {
      //     mimeType: file.type
      //   }
      // });
      // console.log('googleResult', googleResult);

      // // 返回 Google 的地址
      // return { uri: googleResult?.uri };
    })
});