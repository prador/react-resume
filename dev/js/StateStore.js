import { action, observable } from 'mobx';

class varStore {
    @observable name = "1";
    @observable page = "1";
    @observable cur = "1";
    @observable autoList = ["HTML5", "CSS3", "JavaScript", "React JS", "Adobe Photoshop"];
    @observable project = {
        key: 1,
        name: "project 128",
        time: "1 month",
        summary: "",
        contribution: "",
        impact: "",
        tools: [""]
    };
    @observable projects = [{
        key: 1,
        name: "project 128",
        time: "1 month",
        summary: "",
        contribution: "",
        impact: "",
        tools: [""]
    },
    {
        key: 2,
        name: "project ffjfks",
        time: "3 month",
        summary: "",
        contribution: "",
        impact: "",
        tools: [""]
    },
    {
        key: 3,
        name: "project ddkl",
        time: "8 month",
        summary: "",
        contribution: "",
        impact: "",
        tools: [""]
    }];
    changeName(index,value) {
        this.projects[index].name = value;
    }
    logging(value) {
        this.name = value;
    }
    newSkill(value) {
        this.autoList.push(value);
    }
    addProject(value) {
        this.projects.push(value);
    }
    changePage(value) {
        this.page = value;
    }
}

var store = window.store = new varStore

export default store