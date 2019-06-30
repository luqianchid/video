<template>
<div class="videos">
  <div class="cont-header">
    <div class="head-left">
      <h1>Reports</h1>
      <div class="sort">
        <el-select v-model="sort" @change="getSelectReport">
          <el-option
            v-for="item in sorts"
            :key="item.id"
            :label="item.sort"
            :value="item.sort">
          </el-option>
        </el-select>
      </div>
      <div class="file-button">
      <el-select v-model="resolve">
        <el-option label="all" value="all"></el-option>
        <el-option label="已解决" value="已解决"></el-option>
        <el-option label="未解决" value="未解决"></el-option>
      </el-select>
    </div>
    </div>
    <div class="head-right">
      <el-button type="success">Resolve Multiple Reports</el-button>
    </div>
  </div>
  <div class="cont">
    <el-table
    :data="reportList"
    :header-cell-style="{background:'rgb(49,166,213)',color:'#fff',fontSize:'13px'}"
    >
      <el-table-column
        prop="editPage"
        label="EDIT PAGE"
        ></el-table-column>
      <el-table-column
        prop="play"
        label="PLAY"
        ></el-table-column>
      <el-table-column
        prop="reportId"
        label="REPORT ID"
        ></el-table-column>
      <el-table-column
        prop="reportOn"
        label="REPORTED ON"
      ></el-table-column>
      <el-table-column
        prop="lastUpdate"
        label="LAST UPDATED"
        ></el-table-column>
        <el-table-column
        prop="user"
        label="USER"
        ></el-table-column>
        <el-table-column
        prop="resolved"
        label="RESOLVED"
        ></el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  name: 'Notice',
  data () {
    return {
      resolve: 'all',
      search: '',
      reportList: [],
      sort: 'Most Recently Updated',
      sorts: [
        { id: 1, sort: 'Most Recently Reported' },
        { id: 2, sort: 'Oldest Report' },
        { id: 3, sort: 'Most Recently Updated' },
        { id: 4, sort: 'Oldest Update' }
      ]
    }
  },
  methods: {
    getSelectReport () {
      let querySort = {
        'Most Recently Reported': { menu: 'dateCreated', order: 'ASC' },
        'Oldest Report': { menu: 'dateCreated', order: 'DESC' },
        'Oldest Update': { menu: 'lastUpdated', order: 'ASC' },
        'Most Recently Updated': { menu: 'lastUpdated', order: 'DESC' }
      }
      let queryGet = {
        'all': { resolve: 'all' },
        '已解决': { resolve: 'true' },
        '未解决': { resolve: 'false' }
      }
      var param = {
        resolve: queryGet[this.resolve].resolve,
        offset: '0',
        max: 10,
        sort: querySort[this.sort].menu,
        order: querySort[this.sort].order
      }
      this.$ajax.get('report', param).then(r => {
        this.reportList = r.reports
      }).catch(r => {
        console.log(r)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.file-button{
  height: 30px;
  margin-top: 5px;
}
</style>
