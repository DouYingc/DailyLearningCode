<template>
  <div class="todo-footer" v-show="total">
    <label>
      <!-- <input type="checkbox" :checked="isAll" @change="checkAll" /> -->
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{doneTotal}}</span>
      / 全部{{total}}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    name: 'MyFooter',
    props: ['todos',],
    computed: {
      total() {
        return this.todos.length
      },
      doneTotal() {
        /* const x = this.todos.reduce((pre, current) => {
          console.log('@', pre, current)
          return pre + (current.done ? 1 : 0)
        }, 0) */
        return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
      },
      // 简写方式，没有setter 方法  只能被读取不能被修改才可以  后面需要修改
      //控制全选框
      // 一个计算属性可以通过其他的计算属性 在进行计算 
      /* isAll() {
        //已完成事件等于全部事件 且 全部事件大于0  才返回真
        return this.doneTotal === this.total && this.total > 0
      } */
      isAll: {
        get() {
          return this.doneTotal === this.total && this.total > 0
        },
        set(value) {
          // this.checkAllTodo(value)
          this.$emit('checkAllTodo', value)
        }
      }
    },
    methods: {
      /* checkAll(e) {
        this.checkAllTodo(e.target.checked)
      } */
      clearAll() {
        // this.clearAllTodo()
        this.$emit('clearAllTodo')
      }
    }
  }
</script>

<style scoped>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>