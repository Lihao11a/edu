export const asyncRouterMap = [
    {
        path:'/home/main',
        name: 'main',
        meta: {title:"首页", role: ['admin','teacher','manager'],icon:"team"}
    },
    {
        path:'/home/personal',
        name: 'Personal',
        meta: {title:"个人详情", role: ['admin','teacher','manager'],icon:"team"}
    },
    {
        path: '/home/teacher',
        name: 'Teacher',
        meta: {title:"教师管理", role: ['admin'],icon:"team"},
    },
    {
        path: '/home/admissions',
        name: 'Admissions',
        meta: {title:"招生管理",role: ['admin','manager'],icon:"customer-service" },
        children:[
            {
                path: '/home/admissions/intentional',
                name: 'Intentional',
                meta: {title:"意向学员管理",role: ['admin','manager'], icon:"smile",bread:['招生管理','意向学员管理'],keepAlive:true},              
            },
            {
                path: '/home/admissions/solicitation',
                name: 'Solicitation',
                meta: {title:"邀约查询",role: ['admin'],icon:"profile",bread:['招生管理','邀约查询'] },
                
            }
        ]
    },
    {
        path: '/home/student',
        name: 'Student',
        meta: {title:"学生管理", role: ['admin','teacher','manager'],icon:"solution"  },
        children:[
            {
                path: '/home/student/info',
                name: 'Info',
                meta: {title:"学生信息",role: ['admin','teacher','manager'],icon:"file-text",bread:['学生管理','学生信息']},
            },
            {
                path: '/home/student/exam',
                name: 'Exam',
                meta: {title:"考试管理",role: ['admin','teacher'],icon:"form",bread:['学生管理','考试管理']},
            },
            {
                path: '/home/student/lesson',
                name: 'Lesson',
                meta: {title:"课时管理",role: ['admin','manager'] ,icon:"hourglass",bread:['学生管理','课时管理']},
            }
        ]
    },
    {
        path: '/home/class',
        name: 'Class',
        meta: {title:"排课管理",role: ['admin'],icon:"unordered-list" },
    },
    {
        path: '/home/administrative',
        name: 'Administrative',
        meta: {title:"行政管理",role: ['admin'],icon:"car" },
    },
    {
        path: '/home/finance',
        name: 'Finance',
        meta: {title:"财务管理", role: ['admin'],icon:"account-book"},
    },
];
