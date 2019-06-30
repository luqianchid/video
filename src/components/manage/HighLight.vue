<template>
<div class="notify">
  <div class="notify-header">
    <h1>Dashboard Highlights</h1>
  </div>
  <div class="intro">Here you can manage the highlights currently displayed on the dashboard. To add new ones, go into the
    movie/tvShow page and create a new Highlight Entry from there.</div>
  <div class="cont">
    <el-table
    :data="HighList"
    :header-cell-style="{background:'rgb(49,166,213)',color:'#fff',fontSize:'13px'}"
    >
      <el-table-column
        prop="dateCreated"
        label="DATE CREATED"
        ></el-table-column>
      <el-table-column
        prop="media.title"
        label="MOVIE/TV SHOW"
        ></el-table-column>
      <el-table-column
        prop="description"
        label="DESCRIPTION"
        ></el-table-column>
        <el-table-column
          label="EDIT"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="delRow(scope.row.id)">delete</el-button>
          </template>
        </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  name: 'highlight',
  data () {
    return {
      HighList: []
    }
  },
  created () {
    this.getHighLight()
  },
  methods: {
    getHighLight () {
      this.$ajax.get('highlight').then(r => {
        console.log(r)
        for (var i in r) {
          r[i].dateCreated = r[i].dateCreated.split('T')[0]
        }
        this.HighList = r
      }).catch(r => {
        console.log(r)
      })
    },
    delRow (id) {
      this.$confirm('you want to delete this item, are you sure?', '提示', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        this.$ajax.get('delhigh', { // 这里用了delete传参
          params: {
            id: id
          }
        }).then(r => {
          this.$message({
            type: 'success',
            message: 'you delete it'
          })
        }).catch(r => {
          this.$message({
            type: 'warning',
            message: 'some wrong happen,'
          })
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.cont{
  padding-right:20px;
}
</style>
<style lang="scss">
.cell{
  color:#fff!important;
}
</style>
