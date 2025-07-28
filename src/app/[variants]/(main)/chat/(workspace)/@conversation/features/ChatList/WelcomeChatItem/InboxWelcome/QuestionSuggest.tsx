'use client';

import { /** ActionIcon, **/ Block } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { shuffle } from 'lodash-es';
// import { ArrowRight } from 'lucide-react';
// import Link from 'next/link';
import { memo /** , useCallback **/ } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

// import { BRANDING_NAME } from '@/const/branding';
// import { USAGE_DOCUMENTS } from '@/const/url';
import { useSendMessage } from '@/features/ChatInput/useSend';
import { useChatStore } from '@/store/chat';

const useStyles = createStyles(({ css, token, responsive }) => ({
  card: css`
    padding-block: 12px;
    padding-inline: 24px;
    border-radius: 48px;

    color: ${token.colorText};

    background: ${token.colorBgContainer};

    ${responsive.mobile} {
      padding-block: 8px;
      padding-inline: 16px;
    }
  `,
  icon: css`
    color: ${token.colorTextSecondary};
  `,
  title: css`
    color: ${token.colorTextDescription};
  `,
}));

// const qa = shuffle([
//   'q01',
//   'q02',
//   'q03',
//   'q04',
//   'q05',
//   'q06',
//   'q07',
//   'q08',
//   'q09',
//   'q10',
//   'q11',
//   'q12',
//   'q13',
//   'q14',
//   'q15',
// ]);

const mcnRole = [
  {
    id: 'mcn-1',
    label: '用户诉求和痛点',
    context: [
      {
        id: "pain-0",
        role: "user",
        content: `你是一位美妆行业资深市场分析师，正在为MCN机构制定广告策略。请根据用户提供的产品信息或人群信息，系统分析目标人群的核心诉求和痛点。`,
        date: "",
      },
      {
        id: "pain-1",
        role: "assistant",
        content: "好的，请问您需要我分析哪个产品或人群的诉求和痛点？请提供产品信息和人群信息。（例：产品信息：祛痘印精华。人群：痘痘肌，有痘印）",
        date: "",
      },
    ]
  },
  {
    id: 'mcn-2',
    label: '产品痛点可视化',
    context: [
      {
        id: "visual-0",
        role: "user",
        content: `你是一位美妆行业内容策略专家，负责为带货视频策划痛点可视化方案。请按以下步骤完成分析：

分析要求：
痛点挖掘阶段：
在<痛点发现>标签中列出核心痛点，每个需满足：
▸ 必须与产品功能直接相关
按"痛点描述 | 数据支持 | 情感触发点"格式编写
可视化设计阶段：
每个痛点需提供：
▸ 表现形式：短视频/对比图/动画等具体载体
▸ 视觉元素：颜色/构图/特效等设计要素
▸ 时长控制：短视频不超过7秒，图文需3秒内传达核心
▸ 示例脚本：具体到镜头语言（如："特写干燥起皮的嘴唇→产品涂抹→180°平滑转场展示效果"）

最终输出格式：
在<方案>标签内按以下结构呈现：
<痛点1>

痛点名称：
可视化形式：
关键帧描述：
情绪激发点：
</痛点1>
附加要求：
• 避免使用专业后期术语，确保方案可被短视频团队直接执行
• 需包含至少1个"Before-After"对比方案`,
        date: "",
      },
      {
        id: "visual-1",
        role: "assistant",
        content: `好的，请您按照以下格式填写产品信息。例如：
          【产品信息】
          产品名称:真丽斯2.0版氨基酸洁面慕斯
          产品规格:160ml产品成分:椰油酰基谷氨酸TEA盐、椰油酰谷氨酸二钠、椰油酰基谷氨酸TEA盐、月桂酰谷氨酸二钠、椰油酰氨基丙酸钠
          产品功效:调节皮肤的PH值，调节水油，养护皮脂膜，清洁力强
          适用范围:敏感肌可用
          使用体验:洗后水润不紧绷、不假滑、不拔干`,
        date: "",
      },
    ]
  },
  {
    id: 'mcn-3',
    label: '小红书审核建议',
    context: [
      {
        id: "test-0",
        role: "user",
        content: `你是一位资深小红书平台合规审查员，熟悉小红书内容平台最新监管规则。请根据小红书社区规范和相关审核标准，对给定脚本进行审核及三级风险扫描，找出存在的违规风险点，给出调整建议，并按以下框架输出结果：
输出模板：
▫️ 高亮显示违规词（用🚨标注）
▫️ 违规类型说明（引用政策条款）
▫️ 替换建议（提供合规表达方案）
▫️ 风险等级评估（红/黄/绿）
示例：
检测文本："这款面膜全网销量第一！医院皮肤科都在用，7 天淡化所有皱纹，添加的 xxx 成分能修复受损细胞，私信我送独家护肤秘籍"
检测结果：
🚨【违规词 1】"全网销量第一"
- 类型：绝对化用语（违反《广告法》第 9 条）
- 建议改为："累计热销超 10 万盒"
🚨【违规词 2】"医院皮肤科都在用"
- 类型：医疗关联暗示（违反平台医疗美容类目规定）
- 建议改为："实验室实测数据表明"
🚨【违规词 3】"7 天淡化所有皱纹"
- 类型：虚假效果承诺
- 建议改为："28 天可见肤质改善"
🚨【违规词 4】"修复受损细胞"
- 类型：医疗功能宣称
- 建议改为："帮助强韧肌肤屏障"
🚨【违规词 5】"私信我送..."
- 类型：站外引流风险
- 建议改为："评论区抽奖赠送"
📊 综合风险等级：🔴 红色（需修改 5 处）`,
        date: "",
      },
      {
        id: "test-1",
        role: "assistant",
        content: `请在对话框中填写您的内容脚本或文案`,
        date: "",
      },
    ]
  },
  {
    id: 'mcn-4',
    label: '文字可视化',
    context: [
      {
        id: "visualize-0",
        role: "user",
        content: `你的任务是针对给定的文字在目标场景下，提供有趣的形容、比喻以及有趣、有创意的画面呈现方式。
          请按照以下要求进行分析：
          思考在话术上是否有有趣的形容、比喻可以用来描述这段文字在目标场景下的情况。
          考虑在画面上有没有什么有趣的、有创意的呈现方式，例如使用道具、进行试验、测评或比喻可视化等。
          在<话术建议>标签中，详细描述你想到的有趣形容、比喻。在<画面建议>标签中，具体说明你设想的有趣、有创意的画面呈现方式。
          <话术建议>
          [在此写下你的话术建议]
          </话术建议>
          <画面建议>
          [在此写下你的画面建议]
          </画面建议>
          请现在开始分析并提供建议。`,
        date: "",
      },
      {
        id: "visualize-1",
        role: "assistant",
        content: `请在对话框中给我需要分析的文字内容和场景描述。例如：
          文字内容：红色、褐色、黑色痘印。
          场景描述：祛痘精华的广告拍摄。`,
        date: "",
      },
    ]
  },
  {
    id: 'mcn-5',
    label: '小红书脚本生成文案',
    context: [
      {
        id: "script-0",
        role: "user",
        content: `你是一位深谙小红书爆款逻辑的资深内容策划专家，通过个人的表述（就像和姐妹聊天一样），按以下框架生成一篇该脚本的小红书笔记的正文部分(不需要标题，300字以内)：
结构要素：
痛点共鸣：放大特定人群的使用场景痛点（油皮/晒后/脱毛/脱妆）
产品核心：突出技术卖点（成分/专利/特殊质地）+数据支撑
对比体验：强烈前后对比+具象化描述（吸油纸测试/粉底换色号）
使用场景：绑定特定情境（熬夜/旅行/漫展/早八）
背书技巧：身份代入（油敏肌/打工人/coser）+周期见证（半个月/两周测试）
情感表达：表情符号穿插+网络热词（焊在脸上/按头安利）

语言风格：
口语化短句+感叹句式
行业黑话+专业术语结合（细胞外基质/SHR技术）
场景化比喻（猪刚鬣/焦糖饼干/水煮蛋）
行动号召词（冲/锁死/必带）
埋梗造词（牛马秒变韩系女神/卡颜局自救）
Emoji使用（emoji表情要和内容相吻合，不吻合的不要强加emoji，避免滥用）
传播金句（多使用金句，如：没有醒不来的早晨，只有不敢醒的人生）
文字控制（不要出现非中文或英文的文字）

话题标签：
三级火箭式标签：核心词、痛点、方案
流量叠加标签：情绪词、人群定位、核心功能、热搜话题`,
        date: "",
      },
      {
        id: "script-1",
        role: "assistant",
        content: `请在对话框中填写您的内容脚本`,    
        date: "",
      }
    ]
  },
  {
    id: 'mcn-6',
    label: '小红书脚本生成标题',
    context: [
      {
        id: "title-0",
        role: "user",
        content: `根据小红书正文内容生成5个小红书标题，标题要吸睛且贴合小红书正文内容，文字加emoji（非必要，根据情况使用）不要超过20字。
【参考标题示例】
- 眼霜不是智商税，只是你不会正确涂眼霜！
- 夏日穿搭避雷💣斜方肌手臂粗上衣怎么挑？
- 姐妹最懂姐妹‼️春夏口红试色来咯~
- 森系踏青妆|自带江南烟雨的氛围感🍃
- 环球影城攻略㊙️避坑/项目推荐/拍照打卡
- 妆前妆后|每个女孩都有可能💜
- 提前替姐妹们踩雷了！这些防尴尬神器别买！
- 我的Tony说，夏天染这几个颜色绝美不出错~
- 百万博主爱用好物大揭秘💥已经被种草到了
- 音乐节主打妆备|没有辣妹能拒绝这3款发型！

【标题公式】
- 痛点+解决方案："（人群）不会XX？手把手教你XX！"
- 热点+本地化："XX城市新晋XX！居然把XX搬来"
- 教程分层："（时间/场景）第X课之【核心问题】"
- 对比冲突："XX前vs后|同一个XX的不同效果"
- 福利攻略："XX自由攻略！XXX技巧速存"

【优化技巧】
- emoji非必要，根据情况使用
- emoji要和标题相关（例：📷✨），注意emoji在标题中的位置，不要滥用emoji
- 结合地域热点（长沙/湘菜/大围山）
- 制造紧迫感（大数据快推/现在知道还不晚）
- 口语化提问（XX你真的会吗？/谁还没试过）`,
        date: "",
      },
      {
        id: "title-1",
        role: "assistant",
        content: `请在对话框中填写您的文案`,
        date: "",
      }
    ]
  },
  {
    id: 'mcn-7',
    label: '小红书脚本生成评论',
    context: [
      {
        id: "comment-0",
        role: "user",
        content: `你是一位深谙小红书爆款逻辑的资深内容策划专家，从青少年的口吻进行互动，按以下框架生成50条小红书笔记的评论，不要出现负面内容，每条评论不超过15字：
- 夸博主（账号名称：池阿茶（新婚版））
- 询问（价格、购买渠道、适用性、功效、使用感受、口碑）
- 谈感受（心动、爱了、好用、优点、需要、认同博主）
- 表意向（购买、分享、用途）
- 表态度（支持、认同、惊讶、期待）`,
        date: "",
      },
      {
        id: "comment-1",
        role: "assistant",
        content: `请在对话框中填写您的文案`,
        date: "",
      }
    ]
  }
];

const QuestionSuggest = memo<{ mobile?: boolean }>(() => {
  const [updateInputMessage, internal_createMessage, activeId, activeTopicId] = useChatStore((s) => [
    s.updateInputMessage,
    s.internal_createMessage,
    s.activeId,
    s.activeTopicId,
  ]);

  // const { t } = useTranslation('welcome');
  const { styles } = useStyles();
  const { send: sendMessage } = useSendMessage();

  return (
    <Flexbox gap={8} width={'100%'}>
      <Flexbox align={'center'} horizontal justify={'space-between'}>
        <div className={styles.title}>MCN角色</div>
      </Flexbox>
      <Flexbox gap={8} horizontal wrap={'wrap'}>
        {
          mcnRole.map((item) => {
            return (
              <Block
                align={'center'}
                className={styles.card}
                clickable
                gap={8}
                horizontal
                key={item.id}
                onClick={async () => {
                  updateInputMessage(item.context[0].content);

                  sendMessage({ onlyAddUserMessage: true });

                  // 写入AI回复到indexDB
                  if (activeId) {
                    await internal_createMessage({
                      content: item.context[1].content,
                      role: 'assistant',
                      sessionId: activeId,
                      topicId: activeTopicId,
                    });
                  }
                }}
                variant={'outlined'}
                shadow={true}
                glass={true}
              >
                {item.label}
              </Block>
            )
          })
        }
      </Flexbox>
    </Flexbox>
  );
  // return (
  //   <Flexbox gap={8} width={'100%'}>
  //     <Flexbox align={'center'} horizontal justify={'space-between'}>
  //       <div className={styles.title}>{t('guide.questions.title')}</div>
  //       <Link href={USAGE_DOCUMENTS} target={'_blank'}>
  //         <ActionIcon
  //           icon={ArrowRight}
  //           size={{ blockSize: 24, size: 16 }}
  //           title={t('guide.questions.moreBtn')}
  //         />
  //       </Link>
  //     </Flexbox>
  //     <Flexbox gap={8} horizontal wrap={'wrap'}>
  //       {qa.slice(0, mobile ? 2 : 5).map((item) => {
  //         const text = t(`guide.qa.${item}` as any, { appName: BRANDING_NAME });
  //         return (
  //           <Block
  //             align={'center'}
  //             className={styles.card}
  //             clickable
  //             gap={8}
  //             horizontal
  //             key={item}
  //             onClick={() => {
  //               updateInputMessage(text);
  //               sendMessage({ isWelcomeQuestion: true });
  //             }}
  //             variant={'outlined'}
  //           >
  //             {t(text)}
  //           </Block>
  //         );
  //       })}
  //     </Flexbox>
  //   </Flexbox>
  // );
});

export default QuestionSuggest;
