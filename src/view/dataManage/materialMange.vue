<template>
	<div class="background-color">

		<a-row style="padding: 20px 20px 0 20px" type="flex" align="middle">

			<a-col span="5" style="text-align: left;">
				<a-input-search placeholder="请输入搜索内容" style="width: 100%;" @change="onSearch"  @search="searchFn" enterButton/>
			</a-col>

			<a-col span="12" offset="1" style="text-align: left;">
				<a-checkbox-group @change="onChange" :defaultValue='quryForm.department_id'>
					<a-checkbox :value="departmentID">部门素材</a-checkbox>
					<a-checkbox value="0">公司素材</a-checkbox>
				</a-checkbox-group>
			</a-col>

			<a-col span="6" style="text-align: right;">
				<a-tooltip>
				<a-button type="primary" @click="new_create">新建</a-button>
				</a-tooltip>
			</a-col>

		</a-row>
		
		<a-tabs @change="callback" :defaultActiveKey="tabPage">
			<a-tab-pane tab="文本素材" key="1" style="min-height:500px;">
				<textual-material class="tab"  v-on:headCallBackDel="headCallDel"  :dataSource="textData"></textual-material>
                <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!textData.length" ></data-status> -->
			</a-tab-pane>
			<a-tab-pane tab="图片素材" key="2" style="min-height:700px;" >
				<picture-material class="tab"  v-on:headCallBackDel="headCallDel" :dataSource="imgData"></picture-material>
                <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!imgData.length" ></data-status> -->
			</a-tab-pane>
			<a-tab-pane tab="链接素材" key="3" style="min-height:700px;">
				<link-material class="tab"   v-on:headCallBackDel="headCallDel" :dataSource="linkData"></link-material>
                <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!linkData.length" ></data-status> -->
			</a-tab-pane>
			<a-tab-pane tab="名片素材" key="4" style="min-height:500px;">
				<business-card-material class="tab"   v-on:headCallBackDel="headCallDel" :dataSource="cardData"></business-card-material>
                <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!cardData.length" ></data-status> -->
			</a-tab-pane>
			<a-tab-pane tab="小程序素材" key="5" style="min-height:500px;">
				<small-program-material class="tab"   v-on:headCallBackDel="headCallDel" :dataSource="programData"></small-program-material>
                <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!programData.length" ></data-status> -->
			</a-tab-pane>
			<a-tab-pane tab="图文素材" key="6" style="min-height:500px;">
				<friendship-circle-material class="tab"   v-on:headCallBackDel="headCallDel"  :dataSource="text_imgData"></friendship-circle-material>
                <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!text_imgData.length" ></data-status> -->
			</a-tab-pane>
			<!--todo 文件素材-->
			<a-tab-pane tab="文件素材" key="7" style="min-height:500px;">
				<files-material class="tab" v-on:headCallBackDel="headCallDel" :dataSource="filesData"></files-material>
				<!--<data-status :width="200" :hieght="330" class="stausPage" v-if="!filesData.length" ></data-status>-->
			</a-tab-pane>
            <a-tab-pane tab="视频素材" key="8" style="min-height:500px;">
				<video-material class="tab"   v-on:headCallBackDel="headCallDel"  :dataSource="videoData"></video-material>
                <!--<data-status :width="200" :hieght="330" class="stausPage" v-if="!videoData.length" ></data-status>-->
			</a-tab-pane>
		</a-tabs>

	</div>
</template>
<script>

    import dataStatus from '../../components/pageConfig/dataStatus'
	import TextualMaterial from '../../components/dataManage/TextualMaterial'
	import PictureMaterial from '../../components/dataManage/PictureMaterial'
	import LinkMaterial from '../../components/dataManage/LinkMaterial'
	import BusinessCardMaterial from '../../components/dataManage/BusinessCardMaterial'
	import SmallProgramMaterial from '../../components/dataManage/SmallProgramMaterial'
    import FriendshipCircleMaterial from '../../components/dataManage/FriendshipCircleMaterial'
    import filesMaterial from '../../components/dataManage/filesMaterial'
	import videoMaterial from '../../components/dataManage/videoMaterial'
	var emoji = require('../../common/emojiMap');
	export default {
		name: "materialMange",
		components: {
			TextualMaterial,
			PictureMaterial,
			LinkMaterial,
			BusinessCardMaterial,
			SmallProgramMaterial,
            FriendshipCircleMaterial,
            dataStatus,
            filesMaterial,
            videoMaterial
		},
		data() {
			return {
				textData:[],
				imgData:[],
				linkData:[],
				tabPage:'1',
				cardData:[],
				programData:[],
                text_imgData:[],
                filesData:[],
                videoData:[],
				tabs_key:1,
				quryForm: {
					department_id: [this.$store.state.user.user.department.id,"0"],
					searchKey: ''
				},
			}
		},
//		watch(){
//			this.tabPage = 4
//		},
		beforeCreate() {
			 
			
		},
		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
			
		},
		computed: {
			departmentID(){
				return this.$store.state.user.user.department.id //返回store实例的count状态
			},
			
        },
		methods: {
		   headCallDel(id){//文本素材
		   	let that = this;
		   		this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/materialdel',
					data: {'id_arr':[id]} // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.$message.success('删除成功', 2);
						that.refreshGroup();
					}else{
                        that.$message.warn(udata.msg)
                    }
				});
		    },
			callback(key) { //tab切换返回值
				this.tabs_key = key;
			},
			onChange(checkedValues) {//顶部多选
				this.quryForm.department_id = checkedValues;
				console.log('checked = ', this.quryForm.department_id)
				this.refreshGroup();
			},
			onSearch(e) {//顶部搜索
				const {
					value
				} = e.target
				this.quryForm.searchKey = value;
			},
			searchFn() {////点击顶部搜索
				this.refreshGroup();
			},
			new_create() {//新建按钮
				this.$router.push({path: '/dataManage/editMaterial',query:{'create':'1','tabs_key':this.tabs_key}});
			},
			refreshGroup(){
				let that = this;
				var obj = {};
				obj.searchKey = that.quryForm.searchKey;
				
				if(that.quryForm.department_id.length==0){
					obj.all = -1;
				}else if(that.quryForm.department_id.length==1){
					obj.department_id = that.quryForm.department_id[0];
				}else{
					obj.all =1;
					obj.department_id = that.departmentID;
				}
				console.log(obj)
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/material',
					data: obj // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						//1 文本；2 图片；3 链接；7 名片；8 小程序；9 朋友圈素材
						that.textData = udata.data.list.textData?udata.data.list.textData:[];
						that.imgData = udata.data.list.imgData?udata.data.list.imgData:[];
						that.linkData = udata.data.list.linkData?udata.data.list.linkData:[];
						that.cardData = udata.data.list.cardData?udata.data.list.cardData:[];
						that.programData = udata.data.list.programData?udata.data.list.programData:[];
						that.text_imgData = udata.data.list.text_imgData?udata.data.list.text_imgData:[];
						that.filesData = udata.data.list.fileData?udata.data.list.fileData:[];
						that.videoData = udata.data.list.videoData?udata.data.list.videoData:[];
						for (let i=0;i<that.textData.length;i++) {
							that.textData[i].content = emoji.stringToHtml(that.textData[i].content);
						}
                        for (let i=0;i<that.text_imgData.length;i++) {
                            that.text_imgData[i].content = emoji.stringToHtml(that.text_imgData[i].content);
                        }
					}else{
                        that.$message.warn(udata.msg)
                    }
				});
				
			
			}
		},
		created() {
			this.tabPage = this.$route.params.tabpage || '1';
            this.tabs_key = this.tabPage;
			this.refreshGroup();
		}
	}
</script>
<style>
	.ant-card-cover{
		height:150px;
	}
</style>


<style scoped lang="less">
	.background-color {
		background: #fff;
		height: calc(~'100vh - 90px');
		overflow-y: auto;
	}
	.stausPage{
        position:absolute;
        left:50%;
        top:50%;
        z-index:99999;
        transform: translate(-50%,-50%);
    }
</style>