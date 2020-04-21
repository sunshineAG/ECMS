<template>
	<div style="margin: 24px 24px 0;" class="img_style">
		<a-list :grid="{gutter: 24,xl:6, lg: 4, md: 3, sm: 1, xs: 1}" :dataSource="dataSource" :locale="locale" >
	        <a-list-item slot="renderItem" slot-scope="item, index">
                <p v-if="item.ask=='1'"  class="queTitle">
                    <a-icon type="question-circle" class="question" theme='filled'></a-icon>
					{{item.question?item.question:'--'}}
                </p>
	            <a-card hoverable  :style="{width:width?width+'px':'',height:height?height+'px':''}" >
					<img alt="example" :src="item.mediapath" slot="cover" @click="methodHiden?choseFn(item):''" />
					<!-- <div slot="cover" class="bgImg" :style="{ background:' url('+item.mediapath+') no-repeat center',backgroundSize:'contain',width:'100%',height:'100%'}"></div> -->
					<div class="cover_box"  slot="cover" v-if ="methodHiden ? false : true" >
						<div class="cover" slot="cover"  ></div>
						<a-icon type="form" class="btn" @click="editFn(item)" />
						<span >
							<a-popconfirm title="确定要删除吗?" @confirm="deleteFn(item.id)" @cancel="cancel" okText="确定" cancelText="取消">
								<a-icon class="btn" type="delete"  />
							</a-popconfirm>
						</span>
					</div>
				</a-card>
	        </a-list-item>
	    </a-list>
	</div>
</template>


<script>
	export default {
		name: "PictureMaterial",
		 props:['dataSource','methodHiden','width','height'],
		data() {
			return {
				locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
			}
		},
		
		methods: {
			editFn (item) { //回调方法，接收子组件传的参数
				this.$router.push({
          			path: '/dataManage/editMaterial',
                    query: {'id':item.id,'tabs_key':2,'ask':item.ask}
        		})
           },
           choseFn(id){
                this.$emit('headCallBackChose',id);
            },
		   deleteFn(id){
		   		this.$emit('headCallBackDel', id); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
		   },
		    cancel (e) {
		    }
		},
		created() {
            
        }
	}
</script>
<style>
    .ant-card-bordered{
        border-color:#f0f0f0;
        border-radius:4px;
        /* padding:14px; */
    }
    .question{
        font-size:22px;
        vertical-align: middle;
        color:rgb(253, 188, 92);
        padding-bottom:4px;
    }
    .queTitle{
        border:1px solid #e8e8e8;
        border-bottom:0;
        margin:0;
        padding-left:10px;
        height:40px;
        line-height:40px;
        font-size:14px;
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        color:rgb(59, 59, 59);
        text-overflow: ellipsis;
		border-top-left-radius:4px;
		border-top-right-radius:4px;
    }
	 .img_style .ant-card-cover > * {
		 width: auto;
		 display: block;
	 }
	 .img_style .ant-card-cover {
		 padding-bottom: 90%;
		 height: 0;
	 }
	 .img_style .ant-card-cover img {
         margin:14px;
		 width: 90%;
		 height: 90%;
		 position: absolute;
		 object-fit: cover;
	}
</style>


<style lang="less" scop>

.card-list{
    width:100%;
    height:700px;
    overflow-y:auto;
    overflow-x:hidden;
}
	.btn svg{
		font-size: 20px;
	}
	.ant-card-cover{
		position: relative;
		.cover_box{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			text-align: center;
			.cover{
				opacity: 1;
				position: absolute;
				top: 0px;
				left: 0px;
				height: 100%;
				width: 100%;
                z-index: 10;
                border-radius: 4px;
			}
			.btn{
				position: absolute;
				top: 50%;
				margin-top: -16px;
				z-index: 10;
				display: none;
			}
			
			.btn:nth-last-child(1){
				left: 53%;
			}
			.btn:nth-last-child(2){
				left: 30%;
			}
		}
		.cover_box:hover .btn{
			display: block;
			color: #fff;
		}
		.cover_box:hover .cover{
			opacity: 0.52;
			background-color: rgb(136, 136, 136);
		}
	}
	
</style>