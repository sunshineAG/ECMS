<style lang="less"  scoped>

	/*清除浮动代码*/
	.hide {
		display: none;
	}
	.clearFloat:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}

	.clearFloat {
		zoom: 1
	}

	.fr {
		float: right;
	}

	.fl {
		float: left;
	}
	.mySelfCircle .circle_title {
		background: #F7F7F7;
		padding: 0 20px;
        margin: 30px 25px 0 25px;
		div {
			padding: 10px 0;
		}
	}
	.background-color {
		background: #fff;
	}

	.mySelfCircle .row {
		border-bottom: 1px solid #e5e5e5;
	}

	.mySelfCircle{
        color: rgb(16,16,16);
        position: relative;
        background: #ffffff;
		.comment_box {
			margin-top: 15px;
            height: calc(~"100vh - 268px");
            overflow-y: auto;
			.comment_con {
				padding: 0 50px;
				margin-bottom: 10px;
				.content_text {
					padding: 2px 0;
				}
				.albumList {
					.media {
						min-height: 100px;
						min-width: 100px;
						max-height: 300px;
						max-width: 300px;
						margin: 10px 5px 0 5px;
						position: relative;
						cursor: pointer;
						.play_btn {
							height: 30px;
							width: 30px;
							position: absolute;
							top: 50%;
							margin-top: -15px;
							left: 50%;
							margin-left: -15px;
							z-index: 10;
						}
					}
					.media:nth-child(1) {
						margin-left: 0;
					}
					/*.link-content {*/
						/*display: inline-block;*/
						/*padding: 10px;*/
						/*border-radius: 5px;*/
						/*position: relative;*/
						/*color: rgb(16,16,16);*/
						/*background: #e6e5e5;*/
						/*cursor: pointer;*/
						/*img {*/
							/*width: 40px;*/
							/*height: 40px;*/
						/*}*/
					/*}*/
					.link-content {
						display: inline-block;
						min-width: 300px;
						max-width: 350px;
						height: 56px;
						background: #f0f0f0;
						padding: 10px;
						border-radius: 5px;
						position: relative;
						color: rgb(16,16,16);
						white-space: normal;
						word-break: break-all;
						// cursor: pointer;
						text-align: left;
						img {
							width: 40px;
							height: 40px;
							position: absolute;
							top:50%;
							left: 10px;
							transform: translateY(-50%);
						}
					}
				}
				.likeList {
                    padding-top: 5px;
                    color: #108EE9;
				}
			}
			.btn_group {
				text-align: center;
				.ant-btn {
					width: 83px;
				}
			}
			.commentList {
				margin-top: 6px;
				.comment_dec {
					height: auto;
					/*display: -webkit-box;*/
					/*-webkit-box-orient: vertical;*/
					/*-webkit-line-clamp: 1;*/
					/*overflow: hidden;*/
					/*padding-bottom: 6px;*/
					.comment_reply {
						padding-bottom: 2px;
						cursor: pointer;
						.nick_name {
							color: #108EE9;
						}
					}
				}
				.more {
					position: relative;
					top: 20px;
					width: 20px;
					height: 20px;
					margin: 0 auto;
					cursor: pointer;
					img {
						height: 100%;
						width: 100%;
					}
				}
			}
			.created {
				color: #101010;
				padding: 6px 0;
			}
		}
	}
	.input-content {
		// min-height: 100px;
		padding: 0 0 10px 0;
		height: auto;
		border-top: none;
		.tools {
			position: absolute;
			bottom: -14px;
			left: -10px;
			display: flex;
			>div {
				padding: 0 10px;
				cursor: pointer;
				.anticon svg {
					font-size: 20px;
				}
				#emoji {
					position: absolute;
					top: -165px;
					width: 390px;
					height: 155px;
					left: 0;
					border: 1px solid #cccccc;
					padding: 5px;
					z-index: 10;
					line-height: 1;
					background: #ffffff;
					box-shadow: 0px 1px 10px 3px #ccc;
					&::after {
						margin-top: -1px;
						border: 7px solid transparent;
						border-top-color: #fff;
						content: "";
						position: absolute;
						left: 16px;
						top: 100%;
						margin-left: -5px;
					}
				}
			}
		}
		.input-content-area {
			word-wrap: break-word;
			white-space: normal;
			#notice_area {
				border:1px solid #ccc;
			}
			#emoji {
				position: absolute;
				top: -160px;
				width: 390px;
				height: 155px;
				left: 0;
				border: 1px solid #cccccc;
				padding: 5px;
				z-index: 10;
				line-height: 1;
				background: #ffffff;
			}
		}
	}
</style>
<template>
	<div class="mySelfCircle">
        <div style="background: rgb(240,242,245);padding-bottom: 26px">
            <a-button type="default" icon="left" @click="back">返回</a-button>
        </div>
		<a-row class="circle_title">
            <a-col span="3">
                <!--<a-avatar :src="friendCircleDetails.avatar_url" :size="54" style="border-radius: 10px;margin-right: 10px"/>-->
				<img :src="friendCircleDetails.avatar_url" @error="imgExists($event)" style="width: 54px;height: 54px;border-radius: 10px">
                <span>{{friendCircleDetails.nickname}}</span>
            </a-col>
			<a-col span="18" style="text-align: center;">
				<div>朋友圈</div>
			</a-col>
			<a-col span="3" style="text-align: center;">
				<div>操作</div>
			</a-col>
		</a-row>
		<!--评论列表 start-->
		<div class="comment_box">
			<div class="comment_con">
				<a-row class="row">
					<a-col span="21">
						<div class="content_text" v-html="friendCircleDetails.content_text"></div>
						<div class="albumList clearFloat">
							<div v-for="(media_item,media_index) in friendCircleDetails.albumList" class="media fl" v-if="friendCircleDetails.share_url==''">
								<img class="fl" :src="media_item.src" v-if="media_item.type==0" height="100" width="100" @click="previewPic(media_index,friendCircleDetails.albumList)" />
								<video height="100" width="100" class="fl" v-if="media_item.type==20"  style="object-fit: fill;">
									<source :src="media_item.src" type="video/mp4" />
									<source :src="media_item.src" type="video/ogg" />
								</video>
								<img src="../../assets/play.png" :class="!video_playPause?'hide':'play_btn'" @click="playPauseVideo(media_index,friendCircleDetails.albumList)" v-if="media_item.type==20" />
							</div>

							<div v-if="!!friendCircleDetails.share_url" class="link-content" >
								<!-- @click="navToLink(friendCircleDetails.share_url)" -->
								<img v-if="friendCircleDetails.albumList.length==0" src="../../assets/link-img.png" alt="">
								<img v-else  :src="friendCircleDetails.albumList[0].src" alt="">
								<span style="margin-left: 50px;display: inline-block;font-size: 12px;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden; word-break: break-all;display: -webkit-box;position: absolute;top: 50%;transform: translateY(-50%)">{{friendCircleDetails.share_title}}</span>
							</div>

							<!--<div v-if="!!friendCircleDetails.share_url" class="link-content" @click="navToLink(friendCircleDetails.share_url)">-->
								<!--<div style="margin-right: 50px">{{friendCircleDetails.share_title}}</div>-->
								<!--<div style="position: relative;margin-top: 10px;margin-right: 50px">-->
									<!--<span style="display: inline-block;font-size: 12px;color: #999999;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden; word-break: break-all;display: -webkit-box;">{{friendCircleDetails.share_text}}</span>-->
								<!--</div>-->
								<!--<img v-if="friendCircleDetails.albumList.length==0" src="../../assets/link-img.png" alt="">-->
								<!--<img v-else :src="friendCircleDetails.albumList[0].src" alt="">-->
							<!--</div>-->

						</div>
						<div class="likeList" v-if="!!friendCircleDetails.likeList&&friendCircleDetails.likeList.length>0">
                            <!--<a-icon type="heart" v-if="friendCircleDetails.is_like=='0'"/>-->
                            <!--<a-icon type="heart" v-if="friendCircleDetails.is_like=='1'" theme="filled"/>-->
							<a-icon type="heart"/>
							<span v-for="(like_item,like_index) in friendCircleDetails.likeList">
                                {{like_item.nickname}}{{like_index+1==friendCircleDetails.likeList.length?'':'，'}}
                            </span>
						</div>
						<div class="commentList">
							<div class="comment_dec" ref="liCon">
								<div class="comment_reply" v-for="(reply_item,reply_index) in friendCircleDetails.commentList" @click="send_comment(reply_item)">
                                    <span class="nick_name" v-if="reply_item.type=='0'">{{reply_item.nickname}}：</span>
                                    <span class="nick_name" v-if="reply_item.type=='1'">{{reply_item.nickname}}<span style="color: rgb(73,101,130)">回复</span>{{reply_item.tonickname}}：</span>
									<span class="text" v-html="reply_item.comment"></span>
								</div>

							</div>

						</div>

					</a-col>
					<a-col span="3" class="btn_group">
						<p>
							<a-button :type="friendCircleDetails.is_comment==1?'primary':'default'" @click="com_showModal()">评论</a-button>
						</p>
						<p>
							<a-button :type="friendCircleDetails.is_like==1?'primary':'default'" @click="com_like()">点赞</a-button>
						</p>
					</a-col>
				</a-row>
			</div>

		</div>
		<!--评论列表 end-->
		<a-modal :visible="visible"  @cancel="handleCancel" :footer="null">
			<carousel_img :imgList="selectImgList" :pos="pos"></carousel_img>
		</a-modal>

 		<a-modal title="评论朋友圈" :footer="null"  :visible="com_visible" @cancel="com_handleCancel">
			<p class="comment_con" v-if="!!selectComment.nickname">
				<a href="javascript:void(0);">{{selectComment.nickname}}：</a>
				<span v-html="selectComment.comment"></span>
			</p>
 			<!--<a-form @submit="com_handleOk" :form="form">-->
	 			<!--<a-form-item  :wrapperCol="{span: 24}">-->
	      			<!--<a-input type="textarea" :autosize="{ minRows: 4, maxRows: 6 }" :placeholder="placeholder" v-decorator="[ 'com_textarea', {rules: [{ required: true, message: '不能为空' }]}]" maxlength="500"/>-->
	    		<!--</a-form-item>-->
	    		<!--<a-form-item :wrapperCol="{ span: 24 ,offset:17}" style="margin-bottom: 0;">-->
	    			<!--<a-button @click="com_handleCancel">取消</a-button>-->
			      	<!--<a-button type='primary' htmlType='submit' style="margin-left: 10px;">提交</a-button>-->
    			<!--</a-form-item>-->
    		 <!--</a-form>-->
			<div class="input-content" style="position: relative">
				<div class="tools">
					<div>
						<a-icon type="smile" @click="showEmoji()" id="showEmoji" />
						<div v-if="emojiFlag" id="emoji">
							<a href="javascript:;" v-for="(item,index) in emojiList"  v-bind:class="item.className" class="qqemoji" :title_name="item.title" @click="emojiAdd($event);" style="cursor: pointer"></a>
						</div>
					</div>
				</div>
				<div class="input-content-area" >
					<div-edit-area id="friendComment2" :formItem="commentObj" ref="div_edit" @change='getSel()' ></div-edit-area>
				</div>
			</div>
			<div style="padding-top: 25px;text-align: right">
				<a-button @click="com_handleCancel">取消</a-button>
				<a-button type='primary' style="margin-left: 10px;" @click="com_handleOk()">确定</a-button>
			</div>

    	</a-modal>
	</div>
</template>

<script>
    import carousel_img from '../../components/customerChat/carousel_img.vue'
    var emoji = require('../../common/emojiMap');
    var comConf = require('../../common/comConfig');
    import divEditArea from '../../components/dataManage/divEditArea.vue'
	export default {
		name: "friendCircleDetail",
        components: {
            carousel_img,
            divEditArea
        },
		data() {
			return {
                id:this.$route.query.id,
                friendCircleDetails:{
                    albumList:[{src:''}]
				},
				video_playPause: true, //视频播放
				audio_playPause: true, //音频播放
				visible: false,
				media_type: 20, //0：图片；10：音频；20：视频
				com_visible: false,
				form: this.$form.createForm(this),
				queryForm:{
					id:'',
					com_textarea:''
				},
                selectComment:{},
                placeholder:'',
                selectImgList:[],
                pos:0,
                emojiList: emoji.emojiList,
                commentObj:{
                    text:'',
                },
			}
		},
		methods: {
			back() {
				this.$router.back(-1)
			},
            previewPic(index,list) {
                this.selectImgList = list
                this.pos = index
                this.visible = true
            },
            playPauseVideo(index,list) {
                this.selectImgList = list
                this.pos = index
                this.visible = true
                this.video_playPause = false;
            },
			handleCancel(e) {
				this.visible = false
				this.video_playPause = true;
			},
			com_like(){
                if(this.friendCircleDetails.is_like==1) {
                    this.$message.info('已点赞，无法再次点赞')
                    return
                }
                this.friendCircleDetails.is_like=1
                let _this = this;
                comConf.isOfflineRobot(this.friendCircleDetails.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                let data = {
                    cmd:2050,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.friendCircleDetails.robot_username,
                    cmdData:{
                        snsId:this.friendCircleDetails.snsId,
                        type:1
                    },
                    priority:0
                }
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2050 = msg=>{
                    if(msg.status==2) {
                        this.getDetails()
                        this.$message.success('点赞成功', 2);
                    }
                    else if(msg.status==4) {
                        this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:msg.callbackMsg
                                    },
                                })
                            },
                            description: '暂无法执行操作，请检查手机连接状态',
                            duration: 2,
                            style:{
                                background:'#fbf8e9'
                            }
                        });
                    }
                }

			},
			com_showModal() {
			    this.selectComment = {}
		        this.com_visible = true
				this.placeholder = '请输入评论。。。'
		    },
			com_handleOk(e){
                if(this.commentObj.text.replace(/<br\/?>/g, "").match(/^\s*$/)) {
                    this.$message.warning('不能发送空白评论')
                    return
                }
                let data = {}
                comConf.isOfflineRobot(this.friendCircleDetails.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                if(Object.keys(this.selectComment).length>0) {
                    data = {
                        cmd:2050,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:this.friendCircleDetails.robot_username,
                        cmdData:{
                            snsId:this.friendCircleDetails.snsId,
                            type:2,
                            comment:emoji.htmlToString(this.commentObj.text),
                            toComment:{
                                timestamp:this.selectComment.timestamp,
                                username:this.selectComment.username,
                                nickname:this.selectComment.nickname,
                                id:this.selectComment.wx_comment_id
                            }
                        },
                        priority:0
                    }
                } else {
                    data = {
                        cmd:2050,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:this.friendCircleDetails.robot_username,
                        cmdData:{
                            snsId:this.friendCircleDetails.snsId,
                            type:2,
                            comment:emoji.htmlToString(this.commentObj.text)
                        },
                        priority:0
                    }
                }
                this.$ws.sendMsgFun(data)
                this.com_visible = false;
                this.commentObj = {
                    text:'',
                }
                this.$refs.div_edit.clearContent()
                this.$ws.cmd2050 = msg=>{
                    if(msg.status==2) {
                        this.getDetails()
                        this.$message.success('评论成功', 2);
                    }
                    else if(msg.status==4) {
                        this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:msg.callbackMsg
                                    },
                                })
                            },
                            description: '暂无法执行操作，请检查手机连接状态',
                            duration: 2,
                            style:{
                                background:'#fbf8e9'
                            }
                        });
                    }
                }

			},
		    com_handleCancel(){
		    	this.com_visible = false;
		    	this.selectComment = {}
		    },
            getDetails() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/friend-zone-detail',
                    data:{
						id:this.id,
						assistant_id:this.$route.query.assistant_id,
						route_id:174
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.friendCircleDetails = udata.data.friendCircleList
                        this.friendCircleDetails.content_text = emoji.stringToHtml(this.friendCircleDetails.content_text)
						this.friendCircleDetails.commentList.forEach(el=>{
						    el.comment&&(el.comment = emoji.stringToHtml(el.comment))
						})
                    }
                });
            },
            send_comment(item) {
				if(item.username == this.friendCircleDetails.robot_username) {
					return
				}
				this.selectComment = item
				this.com_visible = true
                this.placeholder = '回复' + this.selectComment.nickname + '：'
			},
            navToLink(url) {
                let reg1 = /(http|https):\/\/([\w.]+\/?)\S*/
                window.open(reg1.test(url)?url:'//'+url)
            },
            imgExists(e) {
                console.log('imgLoadError')
                let imgUrl = this.$store.state.user.user.default_url;
                let img = new Image();
                //判断图片大小是否大于0 或者 图片高度与宽度都大于0
                img.onload = function() {
                    if(img.filesize>0||(img.width>0&&img.height>0)){
                        e.target.src = imgUrl;
                        img = null
                    }
                }
                img.src=imgUrl;
            },
            /*表情 start*/
            showEmoji() {
                this.$store.commit('liveChat/setEmojiFlag', !this.emojiFlag)
            },
            closeEmoji() {
                this.$store.commit('liveChat/setEmojiFlag', false)
            },
            emojiAdd(e) {
                document.getElementById('friendComment2').focus()
                let html = "<img src='static/img_file/emojiBG.png' class= '" + e.currentTarget.classList.value + "' title_name='" + e.currentTarget.attributes.title_name.nodeValue + "'>"
                this.emojiAddInPosition(html)
                this.$refs.div_edit.changeTxt()
            },
            emojiAddInPosition(html, t) {
                let sel, range;
                if(t || this.getRange(), window.getSelection) {
                    !t && this.range ? (sel = this.sel, range = this.range) : (sel = window.getSelection(), range = sel.getRangeAt(0)), range.deleteContents();
                    sel = window.getSelection(); //返回一个Selection对象，用来表示用户选择的文本范围或插入符当前位置。
                    let frag, node, lastNode;
                    if(range.createContextualFragment) {
                        frag = range.createContextualFragment(html)
                    } else {
                        let el = document.createElement("div");
                        el.innerHTML = html;
                        frag = document.createDocumentFragment()
                        while((node = el.firstChild)) {
                            lastNode = frag.appendChild(node);
                        }
                    }
                    let ran = frag.lastChild;
                    range.insertNode(frag);
                    range.setStartAfter(ran); //重新定位range（光标位置）
                    sel.removeAllRanges(); //清除所有选中
                    sel.addRange(range); //将新定位的range加入
                    let x = document.getElementById('friendComment2')
                    let l = ran.offsetTop - 55 + ran.offsetHeight - x.offsetHeight;
                    x.scrollTop < l && (x.scrollTop = l)
                } else if(document.selection && document.selection.type != "Control") {
                    // IE < 9
                    document.selection.createRange().pasteHTML(html);
                }
            },
            getSel() {
                window.getSelection ? (this.sel = window.getSelection(), this.range = this.sel.getRangeAt(0)) : this.range = document.selection.createRange()
            },
            getRange() {
                this.range ? window.getSelection ? (this.sel.removeAllRanges(), this.sel.addRange(this.range)) : this.range.select() : this.setRange()
            },
            setRange() {
                let x = document.getElementById('friendComment2')
                var e, t;
                document.createRange ? (e = document.createRange(), e.selectNodeContents(x), e.collapse(!1), t = window.getSelection(), t.removeAllRanges(), t.addRange(e)) : document.selection && (e = document.body.createTextRange(), e.moveToElementText(x), e.collapse(!1), e.select())
            },
            /*表情 end*/
		},
		beforeCreate() {},
		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
            this.globalClick(this.closeEmoji);
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
        computed: {
            emojiFlag() {
                return this.$store.state.liveChat.emojiFlag
            }
        },
		created() {
		    let _this = this
			this.getDetails()
			//'assistant_id':this.queryParam.assistant_id
		},
        beforeDestroy() {
            this.$ws.cmd2050 = null
        }
	}
</script>

