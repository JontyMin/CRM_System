# CRM_System
程序使用AJAX + WebService的模式，采用三层架构，保证系统的可维护性和可扩展性。
系统说明
1.2.1概述
客户关系管理系统用于管理与客户相关的信息与活动，但不包括产品信息、库存数据与销售活动。这三类数据将由XX公司X销售系统进行管理。但本系统需要提供产品信息查询功能、库存数据查询功能、历史订单查询功能。
2.2用户与角色
与本系统相关的用户和角色包括：

系统管理员：
管理系统用户、角色与权限，保证系统正常运行。

销售主管：
对客户服务进行分配。
创建销售机会。
对销售机会进行指派。
对特定销售机会制定客户开发计划。
分析客户贡献、客户构成、客户服务构成和客户流失数据，定期提交客户管理报告。

客户经理：
维护负责的客户信息。
接受客户服务请求，在系统中创建客户服务。
处理分派给自己的客户服务。
对处理的服务进行反馈。
创建销售机会。
对特定销售机会制定客户开发计划。
执行客户开发计划。
对负责的流失客户采取“暂缓流失”或“确定流失”的措施。

本系统采用Microsoft SQL Server数据库，使用ASP.NET进行开发，采取B/S架构。数据库设计原则上符合第三范式，且规范，易于维护
程序使用AJAX+WebService模式，采用三层架构，保证系统的可维护性和可扩展性。
