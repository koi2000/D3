import {StudyDemo01} from "../pages/study/demo01"
import {StudyDemo02} from "../pages/study/demo02"
import {Homework1} from "../pages/homework/hw1";
import {Lab1} from "../pages/lab/lab1";


export const mainRoutes = [
    {
        path: "/study/demo01",
        component: StudyDemo01
    },
    {
        path: "/study/demo02",
        component: StudyDemo02
    },
    {
        path: "/homework/hw1",
        component: Homework1
    },
    {
        path: "/lab/lab1",
        component: Lab1
    }
];

export const adminRoutes = [
    {}
];
