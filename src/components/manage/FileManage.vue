<template>
<div class="file-manage">
  <div class="file-header">
    <h1>File Manage</h1>
    <div class="file-button">
      <el-button
        v-for= "item in manageBtn"
        :key="item.id"
        type="primary"
        size="mini"
        @click="getSelectFile(item.filter)"
        >{{ item.name }}</el-button>
        <el-button
        type="danger"
        size="mini"
        @click="multiDelete"
        >删除多项
        </el-button>
    </div>
  </div>
  <div class="file-cont">
    <el-table
      v-cloak
      :header-cell-style="{background:'rgb(49,166,213)',color:'#fff',fontSize:'13px'}"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      @selection-change="handleSelectionChange"
      style="width: 100%;"
      >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        prop="id"
        label="ID"
        >
      </el-table-column>
      <el-table-column
        fixed
        prop="originalFilename"
        label="名称"
        >
      </el-table-column>
      <el-table-column
        fixed
        prop="contentType"
        label="类型"
        >
      </el-table-column>
      <el-table-column
        fixed
        prop="dateCreated"
        label="上传时间"
        >
      </el-table-column>
      <el-table-column
        fixed
        prop="fileExists"
        label="文件已存在"
        >
      </el-table-column>
      <el-table-column
        fixed
        label="操作"
        >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="delRow(scope.row.id)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
  name: 'Fmanage',
  data () {
    return {
      active: true,
      manageBtn: [
        { id: 1, name: 'All', filter: 'all' },
        { id: 2, name: '本地已存在', filter: 'onlyFile' },
        { id: 3, name: '本地不存在', filter: 'noFile' },
        { id: 4, name: '缺少视频', filter: 'noVideos' }
      ],
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pagesize: 10
    }
  },
  created () {
    this.getSelectFile('all')
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    delRow (id) {
      this.$confirm('you want to delete this item, are you sure?', '提示', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        this.tableData.some((item, i) => {
          if (item.id === id) {
            this.tableData.splice(i, 1)
            return true
          }
        })
        this.$message({
          type: 'info',
          message: 'you have delete one'
        })
      })
    },
    multiDelete () {
      let l = this.multipleSelection
      if (l.length === 0) {
        this.$message('您并没有选中任何要删除的项目')
      } else if (l.length === this.tableData.length) {
        this.tableData = []
      } else {
        let res = []
        for (var i = 0; i < l.length; i++) {
          res.push(l[i].id) // 之后要改
        }
        console.log(res)
      }
      this.multipleSelection = []
    },
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    getSelectFile (filter) {
      var param = { filter: filter, max: 10 }
      this.$ajax.get('files', param).then(r => {
        this.tableData = r.files
        for (let i in this.tableData) {
          this.tableData[i].dateCreated = this.tableData[i].dateCreated.replace('T', ' ').replace('Z', '')
          this.tableData[i].fileExists = String(this.tableData[i].fileExists)
        }
      }).catch(r => {
        console.log(r)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.file-manage{
  width:100%;
  height:100%;
  .file-header{
    display:flex;
    width:100%;
    height:120px;
    flex-wrap: wrap;
    margin-bottom: 20px;
    padding-top:10px;
    border-bottom: 1px solid rgba(255,255,255,.15);
    .file-button{
      width:100%;
      line-height:45px;
    }
  }
  .file-cont{
    width:98%;
    padding-right: 1%;
    height:100%;
    .el-pagination{
      margin-top:10px;
    }
    .el-table{
      color:#fff;
    }
  }
}
</style>
<style lang="scss">
// .el-table td, .el-table th.is-leaf {
//   border-bottom: 1px solid rgba(255,255,255,.12)!important;
// }
// .el-table th, .el-table tr {
//   background-color: #3d3d3d!important;
// }
// .el-table__body tr.hover-row>td {
//   background-color: #4d4d4d!important;
// }
</style>
