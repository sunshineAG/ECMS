<template>
	<div style="margin-top: 10px">
		<a-table :columns="columns" :dataSource="dataSource"  @change="onShowSizeChange" :pagination="pagination" :locale="locale">
			<template slot="operation" slot-scope="text, record, index">
				<div class='editable-row-operations'>
					<span style="margin-right: 10px;">
			          	<a @click="() => editFn(record.id,record.title,record.desc,record.color_id)">编辑</a>
			        </span>
			        <span>
			        	<a-popconfirm title="你确定要删除吗？" placement="top" @confirm="deleteFn(record.id)" okText="确定" cancelText="取消">
						    <a href="javascript:void(0);">删除</a>
						</a-popconfirm>
			        </span>
				</div>
			</template>
		</a-table>
	</div>
</template>
<script>
	export default {
		props:['dataSource','pagination'],
		data() {
			return {
                columns:[
                    {
                        title: '序号',
						align:'center',
                        width:'100px',
                        customRender:function (text, record, index) {
							return index +1
                        }
                    },
//                    {
//						title: '编号',
//						dataIndex: 'id',
//						align:'center',
//						width:'100px',
//						scopedSlots: {
//							customRender: 'id'
//						},
//					},
					{
						title: '标签名称',
						dataIndex: 'title',
						align:'center',
						scopedSlots: {
							customRender: 'title'
						},
					},
					{
						title: '标签备注',
						dataIndex: 'desc',
						align:'center',
						scopedSlots: {
							customRender: 'desc'
						},
					},
                    {
                        title: '操作',
                        dataIndex: 'operation',
                        align:'center',
                        scopedSlots: {
                            customRender: 'operation'
                        },
                    }
				],
				locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
			}
		},
		methods: {
			editFn(id,title,desc,color_id){
				this.$emit('callBackEdit', id,title,desc,color_id);
			},
			deleteFn (id,title,desc) {
				this.$emit('headCallBackDel', id);
		    },
			onShowSizeChange(obj) {
				this.$emit('paginationFn', {
					'current': obj.current,
					'pageSize': obj.pageSize
				});
			},
		},
	}
</script>
<style scoped></style>