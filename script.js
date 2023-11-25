Vue.createApp({
  data() {
    return {
      valueInput: '',
      needDoList: [],
      completeList: [],
    };
  },
  mounted() {

    this.loadFromLocalStorage();
  },
  methods: {
    handleInput(event) {
      this.valueInput = event.target.value;
    },
    addTask() {
      if (this.valueInput === '') {
        return;
      }
      const newTask = {
        title: this.valueInput,
        id: Math.random(),
      };
      this.needDoList.push(newTask);
      this.valueInput = '';


      this.saveToLocalStorage();
    },
    doCheck(index, type) {
      if (type === 'need') {
        const completeMask = this.needDoList.splice(index, 1);
        this.completeList.push(...completeMask);
      } else {
        const noCompleteMask = this.completeList.splice(index, 1);
        this.needDoList.push(...noCompleteMask);
      }


      this.saveToLocalStorage();
    },
    removeMask(index, type) {
      const toDoList = type === 'need' ? this.needDoList : this.completeList;
      toDoList.splice(index, 1);


      this.saveToLocalStorage();
    },
    saveToLocalStorage() {

      localStorage.setItem('needDoList', JSON.stringify(this.needDoList));
      localStorage.setItem('completeList', JSON.stringify(this.completeList));
    },
    loadFromLocalStorage() {

      const needDoList = localStorage.getItem('needDoList');
      const completeList = localStorage.getItem('completeList');

      this.needDoList = needDoList ? JSON.parse(needDoList) : [];
      this.completeList = completeList ? JSON.parse(completeList) : [];
    },
  },
}).mount('#app');