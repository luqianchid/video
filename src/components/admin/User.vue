<template>
<div class="notify">
  <div class="notify-header">
    <h1>Users</h1>
    <div class="notify-btn">
      <el-button type="primary" @click="InviteUser = true">Invite User Via email</el-button>
      <el-dialog title="Create New Video" width="40%" top="30px" :visible.sync="InviteUser">
          <el-form :model="form">
            <!-- 标题 -->
            <el-form-item>
              <div>Email-Address</div>
              <el-input v-model="form.email" placeholder="Email address" autocomplete="off"></el-input>
            </el-form-item>
            <!-- overview -->
            <el-form-item>
              <div>Enable(user can log in and view videos)</div>
             <el-switch
              v-model="form.enable"
              active-color="#13ce66"
              inactive-color="#eee"
              active-text="Enable"
              inactive-text="Disable"
              >
            </el-switch>
            </el-form-item>
            <el-form-item>
              <div>Roles</div>
              <el-checkbox-group v-model="form.checkList">
                <el-checkbox label="Admin"></el-checkbox>
                <el-checkbox label="Content Manage"></el-checkbox>
                <el-checkbox label="Trust User"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="InviteUser = false">Cancel</el-button>
            <el-button type="success" @click="Invite">confirm</el-button>
          </div>
        </el-dialog>
      <el-button type="primary" @click="createUser = true">Create User</el-button>
      <el-dialog title="Create New Video" width="40%" top="30px" :visible.sync="createUser">
        <el-form :model="newUser">
          <!-- 标题 -->
          <el-form-item>
            <div>username</div>
            <el-input v-model="newUser.username" placeholder="username at least 6 character" autocomplete="off"></el-input>
          </el-form-item>
          <!-- overview -->
          <el-form-item>
            <div>password</div>
            <el-input v-model="newUser.password" type="password" placeholder="password at least 6 character" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <div>repassword</div>
            <el-input v-model="newUser.repwd" type="password" placeholder="password at least 6 character" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <div>Roles</div>
            <el-checkbox-group v-model="form.checkList">
              <el-checkbox label="Admin"></el-checkbox>
              <el-checkbox label="Content Manage"></el-checkbox>
              <el-checkbox label="Trust User"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <div>language</div>
            <el-select v-model="newUser.language">
              <el-option
                v-for="item in languages"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="createUser = false">Cancel</el-button>
          <el-button type="success" @click="createNewUser">create</el-button>
        </div>
      </el-dialog>
      <el-dialog title="Create New Video" width="40%" top="30px" :visible.sync="EditUsers">
        <el-form :model="editUser">
          <el-form-item>
            <div>UserName</div>
            <el-input v-model="editUser.username" autocomplete="off"></el-input>
          </el-form-item>
          <!-- overview -->
          <el-form-item>
            <div>Enable(user can log in and view videos)</div>
            <el-switch
              v-model="editUser.enable"
              active-color="#13ce66"
              inactive-color="#eee"
              active-text="Enable"
              inactive-text="Disable"
              >
            </el-switch>
          </el-form-item>
          <el-form-item>
            <div>Exprise</div>
            <el-switch
              v-model="editUser.exprise"
              active-color="#13ce66"
              inactive-color="#eee"
              active-text="Exprise"
              inactive-text="No"
              >
            </el-switch>
          </el-form-item>
          <el-form-item>
            <div>Roles</div>
            <el-checkbox-group v-model="editUser.checkList">
              <el-checkbox label="Admin"></el-checkbox>
              <el-checkbox label="Content Manage"></el-checkbox>
              <el-checkbox label="Trust User"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="EditUsers = false">Cancel</el-button>
          <el-button type="success" @click="Edit">confirm</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
  <div class="cont">
    <el-table
      :data="user"
      :header-cell-style="{background:'rgb(49,166,213)',color:'#fff',fontSize:'13px'}"
      >
      <el-table-column
        prop="username"
        label="USERNAME"
        >
      </el-table-column>
      <el-table-column
        prop="dateCreated"
        label="DATE CREATED"
        >
      </el-table-column>
      <el-table-column
        label="ENABLED"
        >
        <template slot-scope="scope">
          <i v-if="scope.row.enabled" class="el-icon-check">{{ scope.row.Enable }}</i>
          <i v-else class="el-icon-close"></i>
        </template>
      </el-table-column>
      <el-table-column
        label="INVITATION LINK"
        >
        <template slot-scope="scope">
          <i v-if="scope.row.invitationLink === null" class="el-icon-question"></i>
          <span v-else><input type="text" :value="scope.row.invitationLink"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="ROLES"
        >
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.authorities" :key="index">{{ item.displayName }},</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        style="min-width:200px;"
        >
        <template>
          <el-button
            size="mini"
            type="primary"
            @click="EditUsers = true"
          >Edit</el-button>
          <el-button
            size="mini"
            type="danger"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      user: [],
      InviteUser: false,
      createUser: false,
      EditUsers: false,
      form: {
        email: '',
        enable: true,
        checkList: []
      },
      newUser: {
        username: '',
        password: '',
        repwd: '',
        roles: [],
        language: 'chinese',
        checkList: []
      },
      editUser: {
        username: '',
        enable: true,
        checkList: [],
        exprise: false
      },
      languages: [
        { id: 1, label: 'chinese', value: 'cn' },
        { id: 2, label: 'english', value: 'ut' },
        { id: 3, label: 'japanese', value: 'jp' },
        { id: 4, label: 'spanish', value: 'sp' }
      ]
    }
  },
  created () {
    this.getUser()
  },
  watch: {
    'newUser.username': function (val) {
      if (val.length > 6 & val.length < 20) {
        this.newUser.username = val
      } else {
        this.correct = false
      }
    }
  },
  methods: {
    getUser () {
      this.$ajax.get('user').then(r => {
        this.user = r
        console.log(this.user)
      }).catch(r => {
        console.log(r)
      })
    },
    Invite () {
      console.log(this.form)
    },
    createNewUser () {
      console.log(this.newUser)
    },
    Edit () {
      console.log(this.newUser)
      this.EditUser = false
    }
  }
}
</script>

<style lang='scss' scoped>
.notify-btn {
  text-align: right;
  flex: 1;
  margin-right:15px;
  line-height: 45px;
  position: relative;
  .el-button{
    background-color: rgb(40,152,197);
    color:#fff;
    border:none;
    margin-right:30px;
  }
}
.el-switch, .el-checkbox {
  color:#fff!important;
}
.cont{
  padding-right:20px;
  padding-top: 20px;
  .el-table{
    color:#fff;
    .el-icon-check{
      color: #07c594;
      font-weight: bold;
      font-size: 17px;
    }
  }
}
</style>
