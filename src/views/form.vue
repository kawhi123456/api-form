<template>
  <div class="testModel">
    <!-- <el-button type="text" @click="dialogFormVisible = true">
      打开嵌套表单的 Dialog
    </el-button>
    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" width="47vw"> -->
      <el-form :model="form">
        <div class="content">
          <el-form-item v-for="(item,index) in table" :key="index"
            v-bind:class="{'changeWidth':item.type === 'detail'}">
            <template v-if="item.type === 'input'">
              <div class="item-label block">
                <span style="color:red;" v-if="item.required">*</span>
                <span class="block">{{item.caption}}</span>
              </div>
              <el-date-picker v-if="item.style === 'date'" v-model="item.value" type="datetime" style="width:300px;"
                placeholder="选择日期时间">
              </el-date-picker>
              <el-input v-model="item.value" v-else auto-complete="off" :placeholder="item.placeholder"
                style="width:300px;" @blur="changeInput(item)"
                :suffix-icon="item.style === 'search' ? 'el-icon-search' : item.style === 'money' ? 'el-icon-goods' : item.style === 'cellphone' ? 'el-icon-mobile-phone' : item.style === 'email' ? 'el-icon-message' : 'el-icon-date'"
                :type="item.multiline ? 'textarea' : 'text' ">
              </el-input>
            </template>
            <template v-if="item.type === 'staticselect'">
              <div class="item-label block">
                <span style="color:red;" v-if="item.required">*</span>
                <span>{{item.caption}}</span>
              </div>
              <el-select v-model="item.value" style="width:300px;" :placeholder="item.placeholder"
                v-if="item.style === 'dropdown'">
                <el-option v-for="items in item.source.items" :key="items.value" :label="items.key"
                  :value="items.value">
                </el-option>
              </el-select>
              <template v-if="item.style === 'radio'">
                <div>
                  <el-radio v-for="items in item.source.items" :key="items.value" v-model="item.value"
                    :label="items.value">{{items.key}}
                  </el-radio>
                </div>
              </template>
              <el-checkbox-group class="block" v-model="item.value" v-if="item.style === 'check'">
                <div>
                  <el-checkbox v-for="items in item.source.items" :key="items.value" :label="items.value">
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </template>
            <template v-if="item.type === 'apiselect'">
              <div class="item-label block">
                <span style="color:red;" v-if="item.required">*</span>
                <span>{{item.caption}}</span>
              </div>
              <template v-if="JSON.parse(localStorage.getItem(`tableData${index}`))">
                <el-select v-model="item.value" :placeholder="item.placeholder" @focus="handleChange(item,index)"
                  :multiple="item.multiple" style="width:300px;" :filterable="item.multiple"
                  :allow-create="item.multiple">
                  <el-option v-for="(items) in JSON.parse(localStorage.getItem(`tableData${index}`))"
                    :key="items[item.source.value_key]" :label="items[item.source.display_key]"
                    :value="items[item.source.value_key]">
                  </el-option>
                </el-select>
              </template>
              <template v-else>
                <el-select v-model="item.value" :placeholder="item.placeholder" @focus="handleChange(item,index)"
                  :multiple="item.multiple" style="width:300px;" :filterable="item.multiple"
                  :allow-create="item.multiple">
                  <el-option v-for="(items) in tableData" :key="items[item.source.value_key]"
                    :label="items[item.source.display_key]" :value="items[item.source.value_key]">
                  </el-option>
                </el-select>
              </template>
            </template>
            <template v-if="item.type === 'daterange'">
              <div style="width:40vw">
                <div class="item-label block">
                  <span style="color:red;" v-if="item.required">*</span>
                  <span>{{item.caption}}</span>
                </div>
                <el-date-picker v-model="item.value" type="datetimerange" style="width:400px"
                  value-format="yyyy-MM-dd-HH-mm-ss" :placeholder="item.placeholder">
                </el-date-picker>
              </div>
            </template>
            <template v-if="item.type === 'barrange'">
              <div style="width:45vw">
                <div class="item-label block">
                  <span style="color:red;" v-if="item.required">*</span>
                  <span>{{item.caption}}</span>
                </div>
                <el-slider v-model="item.value" range :step="1000" class="block barrange" style="width:82%;"
                  :min="item.min" :max="item.max">
                </el-slider>
              </div>
            </template>
            <template v-if="item.type === 'rating'">
              <div style="width:35vw">
                <div class="item-label block">
                  <span style="color:red;" v-if="item.required">*</span>
                  <span>{{item.caption}}</span>
                </div>
                <el-rate v-model="item.value" :max="item.max" class="block"></el-rate>
              </div>
            </template>
            <template v-if="item.type === 'upload'">
              <div style="width:35vw">
                <div class="item-label block">
                  <span style="color:red;" v-if="item.required">*</span>
                  <span>{{item.caption}}</span>
                </div>
                <el-upload class="avatar-uploader block" action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false" :on-success="handleAvatarSuccess" style="width:178px"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </template>
            <template v-if="item.type === 'detail'">
              <div v-if="item.style === 'from'" style="width:100%">
                <div style="margin-left:55px;">
                  <span style="color:red;" v-if="item.required">*</span>
                  <span>{{item.caption}}</span>
                </div>
                <div style="display:flex;flex-wrap:wrap">
                  <div v-for="(items, index) in item.items" :key="index" style="margin-top:10px;">
                    <div class="block" style="width:100px;text-align:right">
                      <span style="color:red;" v-if="items.required">*</span>
                      <span>{{items.caption}}</span>
                    </div>
                    <el-input v-model="items.value" auto-complete="off" :placeholder="item.placeholder"
                      style="width:300px;" @blur="changeInput(items)" :type="item.multiline ? 'textarea' : 'text' ">
                    </el-input>
                    <el-button type="text" v-if="index%2 !== 0 && item.items.length > 2"
                      @click="item.items.splice(index-1,2)">删除</el-button>
                  </div>
                </div>
                <el-button type="text" @click="add(item)" class="addButton">添加</el-button>
              </div>
              <div v-if="item.style === 'table'">
                <button @click="innerVisible = true">添加</button>
                <el-dialog width="60%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body>
                  <div>
                    <el-form :model="formData">
                      <div class="secondShade" style="display:flex;flex-wrap:wrap">
                        <el-form-item v-for="(items, index) in item.items" :key="index">
                          <template v-if="items.type === 'input'">
                            <div class="block" style="text-align:right">
                              <span style="color:red;" v-if="items.required">*</span>
                              <span class="block">{{items.caption}}</span>
                            </div>
                            <el-date-picker v-if="items.style === 'date'" v-model="items.value" type="datetime"
                              style="width:300px;" placeholder="选择日期时间">
                            </el-date-picker>
                            <el-input v-model="items.value" v-else auto-complete="off" :placeholder="items.placeholder"
                              style="width:300px;" @blur="changeInput(items)"
                              :suffix-icon="items.style === 'search' ? 'el-icon-search' : items.style === 'money' ? 'el-icon-goods' : items.style === 'cellphone' ? 'el-icon-mobile-phone' : items.style === 'email' ? 'el-icon-message' : 'el-icon-date'"
                              :type="items.multiline ? 'textarea' : 'text' ">
                            </el-input>
                          </template>
                          <template v-if="items.type === 'apiselect'">
                            <div class="block" style="text-align:right">
                              <span style="color:red;" v-if="items.required">*</span>
                              <span>{{items.caption}}</span>
                            </div>
                            <template v-if="JSON.parse(localStorage.getItem(`tableData${index}`))">
                              <el-select v-model="items.value" :placeholder="items.placeholder"
                                @focus="handleChange(items,index)" :multiple="items.multiple" style="width:300px;"
                                :filterable="items.multiple" :allow-create="items.multiple">
                                <el-option v-for="(itemss) in JSON.parse(localStorage.getItem(`tableData${index}`))"
                                  :key="itemss[items.source.value_key]" :label="itemss[items.source.display_key]"
                                  :value="itemss[items.source.value_key]">
                                </el-option>
                              </el-select>
                            </template>
                            <template v-else>
                              <el-select v-model="items.value" :placeholder="items.placeholder"
                                @focus="handleChange(items,index)" :multiple="items.multiple" style="width:300px;"
                                :filterable="items.multiple" :allow-create="items.multiple">
                                <el-option v-for="(itemss) in JSON.parse(localStorage.getItem(`tableData${index}`))"
                                  :key="itemss[items.source.value_key]" :label="itemss[items.source.display_key]"
                                  :value="itemss[items.source.value_key]">
                                </el-option>
                              </el-select>
                            </template>
                          </template>
                          <el-button type="text" v-if="(index+1)%3 === 0 && item.items.length > 3"
                            @click="item.items.splice(index-2,3)">删除</el-button>
                        </el-form-item>
                      </div>
                      <el-button class="addButton" type="text" @click="add(item)">添加</el-button>
                    </el-form>
                  </div>
                </el-dialog>
              </div>
            </template>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">提 交</el-button>
      </div>
    <!-- </el-dialog> -->
  </div>
</template>

<script>
  import testData from "../json/approval.json";
  export default {
    name: "testModel",
    data() {
      return {
        form: {
          name: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        },
        formData: {},
        formLabelWidth: "300px",
        dialogFormVisible: true,
        imageUrl: "",
        formTitle: "",
        table: [],
        tableData: [],
        localStorage: "",
        innerVisible: false,
        isTrue: true,
        sliceData: [],
        detailTableData: []
      };
    },
    mounted() {
      let that = this;
      // 重新赋值localStorage 否则会报错 localStorage不存在
      that.localStorage = localStorage;
      that.table = testData.form
      console.log("???",that.table)
      // that.axios.get("http://test.linxall.cn:8984/api/FormTemplates/9001")
      //   .then(function (res) {
      //     console.log("res", res);
      //     that.formTitle = res.data.name;
      //     that.table = res.data.items;
      //     for (let item of res.data.items) {
      //       if (item.type === "detail" && item.style === "from") {
      //         that.sliceData = JSON.parse(JSON.stringify(item.items));
      //       } else if (item.type === "detail" && item.style === "table") {
      //         that.detailTableData = JSON.parse(JSON.stringify(item.items));
      //       }
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    },
    methods: {
      handleAvatarSuccess() {},
      beforeAvatarUpload() {},
      add(item) {
        console.log("???", item);
        if (item.style === "from" && item.type === "detail") {
          var array = JSON.parse(JSON.stringify(item.items));
          var b = array.concat(JSON.parse(JSON.stringify(this.sliceData)));
          item.items = b;
        } else {
          var array = JSON.parse(JSON.stringify(item.items));
          var b = array.concat(JSON.parse(JSON.stringify(this.detailTableData)));
          item.items = b;
        }
      },
      changeInput(data) {
        if (data.value === null) {
          this.$message.error(`请填写${data.caption}`);
        } else {
          if (data.regex !== null) {
            let rgex = new RegExp(data.regex.pattern);
            if (!rgex.test(data.value)) {
              this.$message.error(`${data.regex.notification}`);
            }
          }
        }
      },
      handleChange(data, index) {
        console.log(data, index);
        let that = this;
        that.axios.get(data.source.api).then(function (res) {
          localStorage.setItem("tableData" + index, JSON.stringify(res.data));
          that.tableData = res.data;
        });
      },
      submit() {
        var obj = {};
        for (let item of this.table) {
          if (item.style === "from" && item.type === "detail") {
            for (let data of item.items) {
              var detailFrom = {};
              detailFrom[data.key] = data.value;
              item.value.push(detailFrom);
            }
          }
          if (item.value === "") item.value = -1;
          if (item.type === "daterange" || item.type === "barrange") {
            obj[item.key.split("|")[0]] = item.value[0];
            obj[item.key.split("|")[1]] = item.value[1];
          } else {
            obj[item.key] = item.value;
          }
        }
        console.log(obj);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .avatar-uploader {
    border: 1px solid red !important;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .barrange /deep/ .el-slider__runway {
    margin: 0;
    margin-left: 10px;
  }

  .block {
    display: inline-block;
  }

  /* .content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  } */

  .testModel{
    margin-top:30px;
    text-align: center;
  }

  .testModel /deep/ .el-dialog__body {
    padding: 30px 0px;
  }

  .addButton {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .changeWidth {
    width: 100%;
  }

  .item-label{
    width:120px;
    text-align:right;
    margin-right:20px;
  }
  /* <div class="block" style="margin-left:123px;">最小值：{{item.value[0]}}</div> */
  /* <div class="block">最大值：{{item.value[1]}}</div> */
</style>