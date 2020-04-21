/**
 * Created by cczhuc on 2019/12/19.
 */
class WebSqlClass {
    constructor(options) {
        this.dbName =  options && options.dbName || 'default.db'
        this.tableName = options && options.tableName || "task";   // 表名
        this.db = null;    // 打开的数据库对象
    }

    // 连接数据库(不存在就创建,存在则打开)
    connectDataBase() {
        let _self = this;
        return new Promise((resolve, reject) => {
            _self.db = openDatabase(this.dbName,'1.0',this.dbName,10 *1024 *1024)
            if (_self.db){
                resolve('数据库连接成功');
            }else {
                reject('数据库连接失败')
            }
        })
    }

    /**
     * 执行 新建表 增  删  改  查(单个数据查询或者多个数据查询)
     *
     * @param sql sql语句
     * @param param  参数(数组)
     * @param mode 模式 creater  insert  delete  update  select,对应上文
     * @returns {Promise}
     @used
     增 : this.sql(`insert into ${this.tableName} (begin_time, create_time, end_time, play_id, postion_id, status, task_id) values(?, ?, ?, ?, ?, ?, ?)`,
     [obj.begin_time, obj.create_time, obj.end_time, obj.play_id, obj.postion_id, obj.status, obj.task_id]);

     删 : this.sql(`delete from ${this.tableName} where id = ?`, [id]);

     改 : this.sql(`update ${this.tableName} set begin_time = ?, status = ? where postion_id = ?`, [begin_timeValue, statusValue, postion_idValue]);

     查 : this.sql(`select * from ${this.tableName} where id = ?`, [id]);
     */

    executeSql(sql,param,mode) {
        let _self = this;
        return new Promise((resolve, reject) => {
            switch (mode) {
                case 'create':
                    _self.db.transaction(tx => {
                        tx.executeSql(sql, [],
                            (tx, result) => {
                                resolve('创建表成功:' + result);
                            }, (tx, error) => {
                                reject('创建表失败:' + error.message)
                            }
                        )
                    })
                    break
                case 'insert':
                    _self.db.transaction(tx => {
                        tx.executeSql(sql, param,
                            (tx, result) => {
                                resolve('insert成功:');
                            }, (tx, error) => {
                                reject('insert失败:' + error.message)
                            }
                        )
                    })
                    break
                case 'delete':
                    _self.db.transaction(tx => {
                        tx.executeSql(sql, param,
                            (tx, result) => {
                                resolve('delete成功:');
                            }, (tx, error) => {
                                reject('delete失败:' + error.message)
                            }
                        )
                    })
                    break
                case 'update':
                    _self.db.transaction(tx => {
                        tx.executeSql(sql, param,
                            (tx, result) => {
                                resolve('update成功:');
                            }, (tx, error) => {
                                reject('update失败:' + error.message)
                            }
                        )
                    })
                    break
                case 'select':
                    _self.db.transaction(tx => {
                        tx.executeSql(sql, param,
                            (tx, result) => {
                                resolve(result);
                            }, (tx, error) => {
                                reject('select失败:' + error.message)
                            }
                        )
                    })
                    break
            }
        })
    }
};
export default WebSqlClass
