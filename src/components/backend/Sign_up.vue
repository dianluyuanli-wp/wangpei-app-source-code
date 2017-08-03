<template>
<div id="setup">
  <div class="form">
    <p class="icon">
      <i class="fa fa-fire fa-2x"></i>
    </p>
    <p>
      SETUP
    </p>
    <p class="input">
      <i class="fa fa-user fa-fw"></i>
      <input type="text"
             placeholder="输入用户名"
             v-model.trim="name">
    </p>
    <p class="input">
      <i class="fa fa-key fa-fw"></i>
      <input type="password"
             placeholder="输入密码"
             v-model.trim="pwd">
    </p>
    <p class="input">
      <i class="fa fa-key fa-fw"></i>
      <input type="password"
             placeholder="确认输入"
             v-model.trim="pwdRepeat">
    </p>
    <p class="info">{{info}}</p>
    <p>
      <button @click="submit()">提交</button>
    </p>
  </div>
</div>
</template>

<script>
    export default {
    data() {
        return {
			name: '',
			info: '',
			pwd: '',
			pwdRepeat: ''
        }
    },
    methods:{
		submit () {
		  if (!this.name.length) return this.info = '请输入合适的用户名'
		  if (this.pwd.length < 5) return this.info = '密码长度太短'
		  if (this.pwd !== this.pwdRepeat) return this.info = '两次输入的密码不一致'
		  this.$http.post('/api/setup', {name: this.name, pwd: this.pwd})
			.then(() => {
			  this.info = '创建成功, 即将跳转到登陆...'
			  setTimeout(() => window.location.reload(), 2500)
			  this.$router.push({path: '/console'})
			})
			.catch(() => this.info = '创建失败')
		}
    }
    }
</script>
<style>
    .form {
      width: 500px;
      height: 400px;
      margin: 0 auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .icon i {
      transition: all 4s;
    }

    .icon i:hover {
      transform: rotate(1440deg);
    }

    .info {
      margin: 10px;
      font-size: 12px;
      height: 20px;

    }

    .input:hover {
      color: #3aa373;
    }

    p {
      color: #7f8c8d;
      height: 50px;
      text-align: center;
      transition: all 0.4s;
    }

    p input {
      transition: all 0.4s;
      width: 200px;
      padding: 8px;
      border-bottom: 1px solid #42b983;
    }

    p input:focus {
      width: 210px;
    }

    button {
      transition: all 0.4s;
      color: #7f8c8d;
      border: 1px solid #3aa373;
      border-radius: 4px;
      width: 60px;
      height: 30px;
      cursor: pointer;
    }

    button:hover {
      background-color: #3aa373;
      color: #FFF;
    }
</style>

