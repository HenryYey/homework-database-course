 <template>
  <div class="login">
    <el-form label-position="right" label-width="80px" :model="user">
      <el-form-item label="用户名">
        <el-input v-model="user.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.passWord" type="password"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="handleSubmit()" type="primary" class="login-btn">登录</el-button>
  </div>
</template>
 
<script>
import { userLogin } from "../../api/login";
export default {
  name: "login",
  data() {
    return {
      user: {
        userName: "",
        passWord: ""
      }
    };
  },
  created() {
    if (window.sessionStorage.getItem("token")) {
      this.$router.push({ name: "Dashboard" });
    }
  },

  methods: {
    handleSubmit() {
      userLogin({ userName: this.user.userName, passWord: this.user.passWord })
        .then(res => {
          console.log(res);
          if (res.data.data.token) {
            window.sessionStorage.setItem("token", res.data.data.token);
            this.$router.push({ name: "Dashboard" });
          } else {
            this.$message.error("用户名或密码错误");
          }
        })
        .catch(err => {
          this.$message.error("服务器错误");
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 360px;
  margin-top: 200px;
  margin-left: 50%;
  transform: translateX(-50%);
}

.login-btn {
  margin-left: 50%;
}
</style>
