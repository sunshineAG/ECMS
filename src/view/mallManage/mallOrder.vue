<template>
	<div class="company-user">
		<div class="header" ref='header'>
			<a-form  layout="inline" :form="form" >
				<a-row class="clr">
					<a-col :span="24">
						<div class="fl">
							<a-form-item label="选择平台">
                                <a-select v-model="queryParam.cl_type" @change="onSelect"  style="width: 150px;"  placeholder='选择平台'>
                                    <a-select-option  v-for="(item,idx) in platFormList" :key="item.id" >
                                        {{item.name}}
                                    </a-select-option>
                                </a-select>
							</a-form-item>
                        </div>
						<div class="fr">
							<a-form-item label="">
								<a-input-search v-model="queryParam.content" placeholder="关键词搜索" style="width: 220px" @search="search()" enterButton/>
							</a-form-item>
							<div style="display: inline-block;position: relative;top: 5px">
								<a :href="downLoadURL" download="数据模板">
									<a-button type="primary">
										下载模板
									</a-button>
								</a>
								<a-button type="primary" style="margin-left: 10px" @click="importShow()">导入数据</a-button>
							</div>
						</div>
					</a-col>
				</a-row>
			</a-form>
		</div>
		<div class="content" >
			<a-table ref="table" :rowKey="(record, index) => {return index}" :columns="columns" :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}" :class='[heightFlg?"scrollheade":"scrollheader"]'  :dataSource="orderList" :pagination="false" :loading='loading'   type="checkbox"   :scroll="{y:sheight,x:false}">
				<template slot="platform" slot-scope="text, record, index">
					<div>
						<span :class="['plat-form' + record.cl_type]">{{record.platform}}</span>
					</div>
				</template>
			</a-table>
			<!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!orderList.length"></data-status> -->
			<div ref="bottomPage">
				<div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="orderList.length" >
					<a-pagination v-if="orderList.length" class="col" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;float:right;"/>
				</div>
			</div>
		</div>

		<a-modal title="导入数据" :footer="null" :visible="visible" @cancel="com_handleCancel">
			<a-form>
				<a-form-item :wrapperCol="{span: 24}" label="选择平台：">
					<a-radio-group name="radioGroup" v-model="importPlatFormId">
						<a-radio v-for="(item,index) in importPlatFormList" :value="item.id" :key="index" :class="['plat-form' + item.id]">{{item.name}}</a-radio>
					</a-radio-group>
				</a-form-item>
				<a-form-item :wrapperCol="{span: 24}" label="上传文件：">
					<a-upload
							name="file"
							:action="'http://' +  this.$store.state.user.company.public_ip + ':' +  this.$store.state.user.company.server_port  + '/qiyewxapi/exportfriends?'"
							:headers="headers"
							@change="handleChange"
							:beforeUpload="beforeUpload"
							:disabled="uploading"
                            :fileList="fileList"
                            :data = {id:importPlatFormId,ecms_userid:$store.state.user.user.user_id}
					>
						<!--:action="'http://' +  this.$store.state.user.company.public_ip + ':' +  this.$store.state.user.company.server_port  + '/qiyewxapi/exportfriends'"-->
						<!--action="/index.php?r=uc/sale/export-data"-->
						<a-button> <a-icon type="upload" style="color: #7EB9D6"/>上传文件</a-button>
                        <div style="color: rgba(0,0,0,0.45);margin-top: 10px">
                            支持扩展名xlsx
                        </div>
					</a-upload>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<script>
	import dataStatus from '../../components/pageConfig/dataStatus'
    var comConf = require('../../common/comConfig');
    var storage = require('../../common/store')
	export default {
		name: "companyUser",
		components: {
            dataStatus
		},
		data() {
			return {
                form: this.$form.createForm(this),
                headers:{
                    Authorization: storage.store.get('token')
                },
                queryParam:{
                    content:'',
                    cl_type:''
                },
                orderList:[],
                platFormList:[],
                columns:[
                    {
                        title: '平台',
                        dataIndex:'platform',
                        align:'center',
                        width: '10%',
                        scopedSlots: {
                            customRender: 'platform'
                        }
                    },
                    {
                        title: '订单号/货号',
                        align:'center',
                        width: '10%',
                        dataIndex:'order_id',
                    },
                    {
                        title: '产品名称',
                        align:'center',
                        width: '10%',
                        dataIndex:'product_name',
                    },
                    {
                        title: '产品种类',
                        align:'center',
                        width: '10%',
                        dataIndex:'class_name',
                    },
                    {
                        title: '购买时间',
                        align:'center',
                        width: '10%',
                        dataIndex:'created',
                    },
                    {
                        title: '平台账号',
                        align:'center',
                        width: '10%',
                        dataIndex:'platform_name',
                    },
                    {
                        title: '买家手机号',
                        align:'center',
                        width: '10%',
                        dataIndex:'tel',
                    },
                    {
                        title: '价格',
                        align:'center',
                        width: '10%',
                        dataIndex:'single_price',
                    },
                    {
                        title: '数目',
                        align:'center',
                        width: '10%',
                        dataIndex:'num',
                    },
                    {
                        title: '总金额',
                        align:'center',
                        width: '10%',
                        dataIndex:'all_price',
                    }
				],
                sheight:'',
                heightFlg:false,
                loading:false,
                uploading:false,
                page_size:10,
                page:1,
                total:0,
                visible:false,
				importPlatFormId:3,
                importPlatFormList:[],
                dataUpload:{},
                fileList:[],
                downLoadURL:''
			}
		},
		methods: {
            autoHeight(){
                let that = this
                let obj = comConf.autoHeight(that.$refs.header,that.$refs.table);
                if(obj){
                    that.sheight = obj.sheight?obj.sheight - that.$refs.header.offsetHeight +15:''
                    that.heightFlg = obj.heightFlg
                }
            },
            onSelect(val) {
                this.page = 1
                this.page_size = 10
                this.queryParam.cl_type = val
                this.getOrderList()
            },
            search() {
                this.page = 1
                this.page_size = 10
                this.getOrderList()
			},
            getOrderList() {
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/sale/shop-list',
                    data:Object.assign({p:this.page,n:this.page_size},this.queryParam)
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.orderList = udata.data.list
                        this.loading = false;
                        this.total = parseInt(udata.data.count)
                    }
                });
			},
//            获取平台列表
            getPlatForm() {
                this.$axios({
                    method: 'get',
                    url: '/index.php?r=uc/sale/plat-form',
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.downLoadURL = udata.data.down_url
                        this.importPlatFormList  = JSON.parse(JSON.stringify(udata.data.list))
                        this.platFormList = udata.data.list
                        this.platFormList.unshift({id:'0',name:'全部'})
                        this.queryParam.cl_type  = '0'
                        this.getOrderList()
                    }
                });
            },
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.getOrderList()
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.getOrderList()
            },
            importShow() {
                this.importPlatFormId = 3
                this.fileList = []
                this.uploading = false;
                this.visible = true
			},
            com_handleCancel() {
                this.fileList = []
                this.visible = false
			},
            handleChange(info) {
                let fileList = [...info.fileList];
                fileList = fileList.slice(-1);
                fileList = fileList.map(file => {
                    if (file.response) {
                        file.url = file.response.url;
                    }
                    return file;
                });
                fileList = fileList.filter(file=>{
                    return file.type== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type=='application/vnd.ms-excel' || file.type==''
                })
                this.fileList = fileList;
                if (info.file.status === 'uploading') {
                    this.uploading = true
                    return
                }
                if (info.file.status === 'done') {
                    if(info.file.response.status==1) {
                        this.uploading = false;
//                        this.$message.warning('由于数据过大、系统将静默关联客户订单！')
                        this.visible = false
                        this.getOrderList()
                    } else {
                        this.uploading = false;
                        this.$notification['warning']({
                            message: '上传错误',
                            description: info.file.response.msg,
                        });
                    }
                } else if (info.file.status === 'error') {
                    this.uploading = false;
                    this.$notification['warning']({
                        message: '上传失败',
                        description: '文件'+ info.file.name +'上传失败',
                    });
                }
            },
            beforeUpload(file) {
                let isXLS
                if(file.type=='') {
                    let reg = /.xlsx$/
                    isXLS = reg.test(file.name)
				}else {
                    isXLS = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? true : false
				}
                if(!isXLS) {
                    this.$notification['warning']({
                        message: '文件格式不正确',
                        description: '文件格式不正确，请选择xlsx。',
                    });
                }
                return isXLS
            },
		},
		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
            window.addEventListener('resize',this.autoHeight,false)
		},
        watch:{
            orderList:function(){
                let clientHeight = `${document.documentElement.clientHeight}`; //页面可视区高度
                let headerHeight = this.$refs.header.offsetHeight + 126; // 头部及表格头部
                this.$nextTick(function(){
                    if((clientHeight - headerHeight) <= (this.$refs.table.$el.offsetHeight + 40)){
                        this.heightFlg = true;
                        this.sheight = clientHeight - headerHeight - this.$refs.header.offsetHeight + 45;
                    }else{
                        this.heightFlg = false;
                    }
                });
            }
        },
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		computed: {
			
        },
		created() {
            this.getPlatForm()
        },
        beforDestroy(){
            window.removeEventListener('resize',this.autoHeight,false)
        }
	}
</script>
<style lang="less" scoped>
	.company-user {
		background: #ffffff;
		position: relative;
		padding:0 14px;
		border-radius:3px;
		height: calc(~"100vh - 90px");
        overflow: auto;
		.header {
			padding: 12px 0;
			background:#fff;
		}
		.content {
			position:relative;
		}
	}
	.fl{
		float:left;
	}
	.fr{
		float:right;
	}
	.clr:after{
		display: block;
		height:0;
		content:'';
		visibility: hidden;
		clear:both;
	}
	.stausPage{
		position:absolute;
		left:50%;
		top:200px;
		z-index:999;
		transform: translate(-50%,0);
	}
	.actionIcon{
		width: 36px;
		height:36px;
		cursor: pointer;
	}
	.label{
		border:1px dashed #2686d4;
		border-radius:10px;
		width:60px;
		font-size:12px;
		padding:2px 6px;
		cursor: pointer;
		line-height: 16px;
	}
	.company-user .botomCheck{
		float:left;
		vertical-align: middle;
		margin-left:42px;
		margin-top:6px;
	}
    .plat-form3 {
        color: #FE0733;
    }
    .plat-form4 {
        color: #FE5606;
    }
    .plat-form5 {
        color: #E22117;
    }
    .plat-form6 {
        color: #E6090D;
    }
</style>