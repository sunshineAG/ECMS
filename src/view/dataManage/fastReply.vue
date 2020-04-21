<template>
	<div class="background-color">

		<a-row >
			<a-col span="24" class="addBtn">
				<a-button type="primary" @click="new_create" style="z-index: 100">新建</a-button>
				<!--<a-button type="primary" @click="add_material">选择素材添加</a-button>style="padding: 20px 20px 0 20px"style="text-align: right;"-->
			</a-col>
		</a-row>		
		<a-tabs @change="callback" :defaultActiveKey="tabPage">
			<a-tab-pane tab="文本素材" key="1">
				<textual-material class="tab"  v-on:headCallBackDel="headCallDel" :dataSource="textData" ></textual-material>
                <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!textData.length" ></data-status> -->
			</a-tab-pane>
			<a-tab-pane tab="图片素材" key="2" style="min-height:700px;">
				<picture-material class="tab"  v-on:headCallBackDel="headCallDel" :dataSource="imgData" ></picture-material>
                <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!imgData.length" ></data-status> -->
			</a-tab-pane>
			<a-tab-pane tab="链接素材" key="3" style="min-height:700px;">
				<link-material class="tab" v-on:headCallBackDel="headCallDel" :dataSource="linkData" ></link-material>
                <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!linkData.length" ></data-status> -->
			</a-tab-pane>
			<a-tab-pane tab="名片素材" key="4">
				<business-card-material class="tab"   v-on:headCallBackDel="headCallDel" :dataSource="cardData"></business-card-material>
                <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!cardData.length" ></data-status> -->
			</a-tab-pane>
			<a-tab-pane tab="小程序素材" key="5">
				<small-program-material class="tab"   v-on:headCallBackDel="headCallDel" :dataSource="programData" ></small-program-material>
                <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!programData.length" ></data-status> -->
			</a-tab-pane>
			<a-tab-pane tab="文件素材" key="7">
                <files-material class="tab" v-on:headCallBackDel="headCallDel" :dataSource="filesData" ></files-material>
			</a-tab-pane>
            <a-tab-pane tab="视频素材" key="8">
                <video-material class="tab"  v-on:headCallBackDel="headCallDel"  :dataSource="videoData"></video-material>
			</a-tab-pane>
				<!-- <friendship-circle-material class="tab"  v-on:headCallBackDel="headCallDel" :dataSource="text_imgData"></friendship-circle-material> -->
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
    import filesMaterial from '../../components/dataManage/filesMaterial'
    import FriendshipCircleMaterial from '../../components/dataManage/FriendshipCircleMaterial'
     import videoMaterial from '../../components/dataManage/videoMaterial'
	var emoji = require('../../common/emojiMap');
	import { powerObject } from '@/common/util'	
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
                filesData:[
                    {title:'文件素材555555555.rar',
                     size:'30M',
                     ask:'3'
                    },
                    {title:'文件素材2.zip',
                     size:'30M'
                    }
				],
                videoData:[],
				textData:[],
				imgData:[],
				linkData:[],
				tabpage:1,
				cardData:[],
				programData:[],
				text_imgData:[],
				tabs_key:1,
				quryForm: {
					department_id: [this.$store.state.user.user.department.id,"0"],
					searchKey: ''
				},
			}
		},

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
					data: {'id_arr':[id],'ask':'1'} // 参数
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
			new_create() {//新建按钮
				this.$router.push({path: '/dataManage/editMaterial',query:{'create':'1','tabs_key':this.tabs_key,'ask':'1','fastReply':'true'}});
			},
			add_material(){
				
			},
			refreshGroup(){
				let that = this;
                var obj = {};
				obj.searchKey = that.quryForm.searchKey;
                obj.department_id = that.$store.state.user.user.department.id;
                obj.ask='1'
				obj.type='1'
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/material',
					data: obj // 参数
				}).then(function(d) {
                    // 响应成功回调
                    var udata = d.data;                    
					if(udata.status == 1) {
						//1 文本；2 图片；3 链接；7 名片；8 小程序；9 朋友圈素材 10：文件 11：视频
                        that.textData = []
                        that.imgData = []
                        that.linkData = []
                        that.cardData = []
                        that.programData = []
                        that.filesData = []
                        that.videoData = []
                        udata.data.list.forEach(el=>{
                            switch (el.type) {
								case '1':
                                    that.textData.push(el)
								    break
								case '2':
                                    that.imgData.push(el)
								    break
                                case '3':
                                    that.linkData.push(el)
                                    break
                                case '7':
                                    that.cardData.push(el)
                                    break
                                case '8':
                                    that.programData.push(el)
                                    break
                                case '10':
                                    that.filesData.push(el)
                                    break
                                case '11':
                                    that.videoData.push(el)
                                    break
							}
						})
//						that.textData = udata.data.list.textData;
//
//						that.imgData = udata.data.list.imgData;
//						that.linkData = udata.data.list.linkData;
//						that.cardData = udata.data.list.cardData;
//						that.programData = udata.data.list.programData;
//						that.text_imgData = udata.data.list.text_imgData;
						for (let i=0;i<that.textData.length;i++) {
							that.textData[i].content = emoji.stringToHtml(that.textData[i].content);
						}
//						for (let i=0;i<that.text_imgData.length;i++) {
//							that.text_imgData[i].content = emoji.stringToHtml(that.text_imgData[i].content);
//						}
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
	.addBtn{
		text-align: right;
		position:absolute;
		top:6px;
		right:20px;
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