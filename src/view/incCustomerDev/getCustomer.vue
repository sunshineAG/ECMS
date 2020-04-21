<template>
  <div class="companyStyle">
    <div class="company-header" ref="header">
      <div class="row">
        <span class="add-statuas floatLeft">加粉状态 :</span>
        <a-select
          class="selectCommon floatLeft"
          v-model="queryParam.status"
          @change="choseStatus"
          placeholder="选择企业号类型"
        >
          <a-select-option v-for="(item,index) in statusList" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
        <span class="right">
          <a-input-search
            class="search"
            v-model="queryParam.key"
            placeholder="关键词搜索"
            maxlength="15"
            enterButton
            @search="refreshGroup"
          />
        <a-button type="primary" @click="downloadtemp"> 下载模板 </a-button>
        <a-upload
            :action="'http://' +  this.$store.state.user.company.public_ip + ':' +  this.$store.state.user.company.server_port  + '/qiyewxapi/importexternal'"
            :data="upData"
            name="file"
            @change="fileHandleChange"
            :headers="headers"
            :beforeUpload=" fileBeforeUpload"
            :showUploadList="false"
        >
            <a-button type="primary" > 导入数据 </a-button>
        </a-upload>
        </span>
      </div>
    </div>
    <div class="company-content">
      <a-table
        ref="table"
        :columns="columns"
        :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}"
        :class="[heightFlg?'scrollheade':'scrollheader']"
        :dataSource="customerList"
        :pagination="false"
        :loading="loading"
        :locale="locale"
        :rowKey="(record) => record.id"
        :scroll="{y:sheight,x:false}"
      >
        <template slot="avatar" slot-scope="text,record,index">
          <div>
            <img
              :src="text?text:'../../assets/defalute.svg'"
              @error="imgExists($event)"
              style="width: 30px;height: 30px;border-radius:100%"
            />
            <span>{{record.name}}</span>
          </div>
        </template>
        <template slot="status" slot-scope="text,record,index">
          <div>
            <a-badge v-if="text.status === 4" status="default" text="无数据" class="scope"></a-badge>
            <a-badge
              v-else
              :status="text.status==0?'default':text.status=='1'?'warning':text.status=='2'?'success':''"
              :text="text.status==0?'未添加':text.status=='1'?'已申请':text.status=='2'?'已添加':''"
            ></a-badge>
          </div>
        </template>
      </a-table>
      <div ref="bottomPage">
        <div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="customerList.length">
          <span style="vertical-align: middle;">
            <a-button
              type="primary"
              style="float:left;margin-left:16px;"
              @click="pullData(false)"
            >导出数据</a-button>
            <span
              style="vertical-align:middle;margin-left:20px;"
              v-if="selectedRowKeys.length"
            >客户总数: {{customerList.length}} 个</span>
          </span>
          <a-pagination
            v-if="customerList.length"
            class="col"
            showQuickJumper
            showSizeChanger
            :showTotal="total => `总共${total}条`"
            v-model="page"
            :pageSize="page_size"
            :total="total"
            :pageSizeOptions="['10', '20', '30', '40', '50']"
            @change="onChange"
            @showSizeChange="onShowSizeChange"
            style="text-align: right;float:right;"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var comConf = require("../../common/comConfig");
var storage = require("../../common/store");
import moment from "moment";
import dataStatus from "../../components/pageConfig/dataStatus";
export default {
  name: "",
  components: {
    dataStatus
  },
  data() {
    return {
      disableDepartment: true, //权限控制
      heightFlg: false, //表格样式控制
      loading: false,
      sheight: "", //表格高度
      selectTagFlag: false,
      confirmLoading: false,
      checkAll: false,
      page_size: 10,
      page: 1,
      total: 0,
      upData: {
        ecms_userid: this.$store.state.user.user.user_id
      },
      headers: {
        Authorization: storage.store.get("token")
      },
      locale: {
        filterConfirm: "",
        filterReset: "",
        emptyText: ""
      },
      queryParam: {
        status: 0,
        key: ""
      },
      statusList: [
        {
          id: 0,
          name: "未添加"
        },
        {
          id: 1,
          name: "已申请"
        },
        {
          id: 2,
          name: "已添加"
        },
        {
          id: 4,
          name: "无数据"
        }
      ],
      columns: [
        {
          title: "手机号",
          width: 100,
          align: "left",
          dataIndex: "tel"
        },
        {
          title: "客户信息",
          width: 100,
          align: "left",
          scopedSlots: {
            customRender: "avatar"
          }
        },
        {
          title: "客户类型",
          width: 100,
          align: "left",
          dataIndex: "type",
          customRender: text => {
            return text=== 0 ? '' :text === 1 ? "企业微信" : "个人微信";
          }
        },
        {
          title: "导入时间",
          dataIndex: "createtime",
          width: 100,
          align: "left",
          customRender:text => {
              return  comConf.format(text)
          }
        },
        {
          title: "加粉状态",
          width: 100,
          align: "left",
          scopedSlots: {
            customRender: "status"
          }
        }
      ],
      customerList: [], //表格数据
      selectedRowKeys: []
    };
  },
  mounted() {
    window.addEventListener("resize", this.autoHeight, false);
  },
  computed: {},
  watch: {
        customerList:function(){
            let clientHeight = `${document.documentElement.clientHeight}`; //页面可视区高度
            let headerHeight = this.$refs.header.offsetHeight + 126; // 头部及表格头部 
            this.$nextTick(function(){
                if((clientHeight - headerHeight) <= (this.$refs.table.$el.offsetHeight + 40)){
                    this.heightFlg = true;
                    this.sheight = clientHeight - headerHeight - this.$refs.header.offsetHeight - 10;
                }else{
                    this.heightFlg = false;
                }
            });
        }
  },
  methods: {
    autoHeight() {
      let that = this;
      let obj = comConf.autoHeight(that.$refs.header, that.$refs.table);
      if (obj) {
        that.sheight = obj.sheight?obj.sheight - that.$refs.header.offsetHeight - 30:''
        that.heightFlg = obj.heightFlg;
      }
    },
    choseStatus(val) {
      //选择状态
      this.queryParam.status = val;
      this.refreshGroup();
    },
    downloadtemp() {
        location.href =  'http://' +  this.$store.state.user.company.public_ip + ':' +  this.$store.state.user.company.server_port  + '/qiyewxapi/downloadtemp?timestamp=' + new Date().getTime() +Math.floor(1000 + Math.random()*9000);
    },
    pullData() {
      location.href =
        "/qiyewxapi/getimportlist?" +
        "&status=" +
        this.queryParam.status +
        "&key=" +
        this.queryParam.key +
        "&ecms_userid=" +
        this.$store.state.user.user.user_id +
        "&action=download";
    },
    fileHandleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        if (info.file.response.status == 1) {
          this.$message.info(info.file.response.msg);
          this.refreshGroup();
        } else {
          this.$message.warning(info.file.response.msg);
        }
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    sizeChange(limit) {
      let size = "";
      if (limit < 0.1 * 1024) {
        //小于0.1KB，则转化成B
        size = limit.toFixed(2) + "B";
      } else if (limit < 0.1 * 1024 * 1024) {
        //小于0.1MB，则转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
      } else if (limit < 0.1 * 1024 * 1024 * 1024) {
        //小于0.1GB，则转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
      } else {
        //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      }
      return size;
    },
    fileBeforeUpload(file) {
      let type = file.name;
      let suffix = type.substr(type.lastIndexOf("."));
      let isLt2M = file.size / 1024 / 1024 < 20;
      if (suffix != ".xlsx" && suffix === ".xls") {
        this.$message.warn("请上传 .xlsx 格式的文件", 4);
        return false;
      }
      if (!isLt2M) {
        this.$message.error("文件大小必须小于20MB!");
      }
      return isLt2M;
    },
    onChange(page,pageSize) {
      //分页
        this.page = page
        this.page_size = pageSize
        this.refreshGroup()
    },
    onShowSizeChange(size) {
      //分页条数
        this.page = 1
        this.page_size = size
        this.refreshGroup()
    },
    refreshGroup() {
      this.$axios({
        method: "POST",
        url: "/qiyewxapi/getimportlist?",
        data: {
          status: this.queryParam.status,
          key: this.queryParam.key,
          ecms_userid: this.$store.state.user.user.user_id
        }
      }).then(res => {
        let udata = res.data;
        if (udata.status === 1) {
          this.customerList = udata.data.list;
          this.total = parseInt(udata.data.count);
        }
      });
    },
    imgExists(e) {
      console.log("imgLoadError");
      let imgUrl = this.$store.state.user.user.default_url;
      let img = new Image();
      //判断图片大小是否大于0 或者 图片高度与宽度都大于0
      img.onload = function() {
        if (img.filesize > 0 || (img.width > 0 && img.height > 0)) {
          e.target.src = imgUrl;
          img = null;
        }
      };
      img.src = imgUrl;
    },
  },
  created() {
    this.refreshGroup();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.autoHeight, false);
  }
};
</script>
<style lang="less" scoped>
.row:nth-child(1) {
  margin-bottom: 10px;
}
.add-statuas {
  margin: 4px 10px 0 0;
  font-size: 14px;
  font-weight: 500;
}
.selectTag {
  margin-right: 30px;
}
.pickTIime {
  width: 190px;
}
.search-a {
  margin-left: 10px;
  width: 58px;
  height: 31px;
  text-align: center;
}
.modalFoot {
  text-align: right;
  height: 44px;
  line-height: 62px;
  border-top: 1px solid #f0f0f0;
  margin-top: 10px;
}
.actionIcon {
  width: 36px;
  height: 36px;
  cursor: pointer;
}
</style>
<style lang="less">
.scope .ant-badge-status-default {
  background: #979696;
}
</style>