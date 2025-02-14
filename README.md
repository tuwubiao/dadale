# 答答乐 AI 智能答题平台
本项目将从核心业务、技术优化和项目展示三个方面进行介绍。
# 核心业务
答答乐 AI 智能答题平台的核心业务流程图如下：

![图片](https://github.com/user-attachments/assets/ae7e056c-b11b-43b9-b7a2-76a66740f734)

用户：登录用户可以查看应用列表并检索应用，进行答题并在答题结束后查看测评结果，同时可以将应用或答题结果进行分享。

应用创建者：每位登录用户（管理员）均可创建应用，创建时可手动设置题目或通过AI自动生成题目，评分方式可选择自定义答案评分或AI智能测评，提高评分的智能性和多维度。

管理员：管理员可以对应用创建者提交的应用进行审核，审核通过后方可展示在平台主页；可以对自身的答题记录、用户信息、题目内容、评分标准及用户回答等进行全面管理；此外，还可以查看平台的数据统计，掌握运营情况和用户行为分析。

相较于传统的答题平台，本平台在业务层面上具有创新性，主要体现在引入AI能力：一是通过AI生成题目，提高题目多样性和创建效率；二是借助AI对用户答题结果进行智能分析并给出测评，而无需完全依赖预设答案。同时，平台还支持答题结果和应用的便捷分享，提升互动性和传播效果。
# 技术优化

在 AI 生成题目方面：
针对一般 AI 调用生成题目速度慢、题目数量过多易导致超时、页面无响应等用户体验不佳的问题，本平台采用 RxJava 与 SSE（Server-Sent Events） 技术进行优化。系统通过 RxJava 实时接收来自 智谱 AI 的题目数据流，持续拼接字符串生成题目。一旦拼接出完整题目，即通过 SSE 实时推送至前端，而非等待全部生成后再统一返回，从而显著提升了响应速度与用户体验。

在 AI 评分方面：
针对用户在回答相同内容时反复调用 AI 导致系统性能下降的问题，本系统引入 Caffeine 本地缓存 机制，通过 应用 ID 与用户答案 组合作为缓存键（key），并使用哈希算法进行压缩，先从本地缓存中查找评分结果，若命中则直接返回，无需调用智谱 AI，从而有效提升系统性能和用户体验。
为防止多个用户提交相同答案且本地缓存未命中（缓存击穿）导致系统压力陡增，本系统采用 Redisson 分布式锁为缓存操作加锁，从而防止缓存击穿问题，进一步增强系统的稳定性与性能。

在数据库设计方面：
由于单用户可多次答题、单应用可被多用户反复作答，导致用户答题记录表数据量巨大、查询效率下降，本系统采用 Sharding-JDBC 分库分表技术，将用户答题数据按规则拆分存储，从而显著减轻数据库压力，提高查询性能并增强用户体验。

在幂等设计方面：
为防止用户在提交答案时因多次点击导致重复提交、重复调用 智谱 AI 评分，从而影响系统性能和用户体验，本系统采用雪花算法生成全局唯一 ID 作为答题记录主键，且在用户进入答题页面时即提前生成该 ID，无论用户如何重复提交，均使用相同的唯一 ID，避免重复插入记录，从根本上保证了接口幂等性，有效提升系统性能与用户体验。

在线程池管理方面：
考虑到全局共享的 Schedulers.io() 线程池在短时间内遇到大量并发任务时可能导致线程数急剧膨胀，引发 OOM（内存溢出），严重影响系统稳定性和用户体验，本系统采用 隔离线程池策略：VIP 用户 独享独立线程池，保障高优先级用户的响应速度和使用体验。而普通用户 共享 Schedulers.single() 线程池，统一管理普通用户请求，提升资源利用率并防止线程数失控。

# 项目展示
用户：

登录注册

![图片](https://github.com/user-attachments/assets/bf4db427-9b66-406b-b641-5a17aa47fb43)

![图片](https://github.com/user-attachments/assets/f7556874-a6db-4725-8115-7589f205b7ef)

检索应用

![图片](https://github.com/user-attachments/assets/9667d1a4-4ef6-46a1-82d6-0e21dff2ef16)

![图片](https://github.com/user-attachments/assets/65c088ea-771a-45b8-bca8-eb50de2da0d7)

在线答题

![图片](https://github.com/user-attachments/assets/6e567c9e-870b-4597-a8c9-49d99b2ae4d2)

![图片](https://github.com/user-attachments/assets/07f7c645-e6aa-46d4-8099-64c0e3fdf628)

查看结果

![图片](https://github.com/user-attachments/assets/1b71ad9a-fc42-43e9-bf0d-b0ca43ca7841)

![图片](https://github.com/user-attachments/assets/ed8eac2f-63d0-4da4-acd1-69b6c123ed57)

分享应用

![图片](https://github.com/user-attachments/assets/5adaa138-c6f3-48ed-8d24-9fad151357da)

应用创建者：

填写应用信息

![图片](https://github.com/user-attachments/assets/ca5cee28-b7a8-4119-9009-f2604bd0564e)

添加题目

![图片](https://github.com/user-attachments/assets/279b7eed-5d70-44c7-97f3-da91e0a626f7)

![图片](https://github.com/user-attachments/assets/cdb81772-ecaa-443a-9dec-3cbcba6cf066)

![图片](https://github.com/user-attachments/assets/ca39d779-d479-4832-9c25-66b0fea3b1fe)

设置评分规则

![图片](https://github.com/user-attachments/assets/af21d38e-93e0-4f28-b828-aa2ce2f276ff)

创建应用

![图片](https://github.com/user-attachments/assets/5d03c843-c934-4b8a-b01b-0107c8316275)

管理员：

应用统计

![图片](https://github.com/user-attachments/assets/235ba8f7-8f5a-4b79-aaef-3160531d0164)

应用管理

![图片](https://github.com/user-attachments/assets/7e0d537d-1aa4-4248-ba66-0c552fc6d119)

用户管理

![图片](https://github.com/user-attachments/assets/4dd6985b-b66b-4f3e-8894-bd5858e77eab)

题目管理

![图片](https://github.com/user-attachments/assets/cfe842bc-90ac-4103-b56f-2dd270711d87)

评分管理

![图片](https://github.com/user-attachments/assets/54a223d1-60c0-4aa4-a4fd-e787547e4f08)

回答管理

![图片](https://github.com/user-attachments/assets/2f4451f4-bab1-4129-ace3-a0c9d627d664)

