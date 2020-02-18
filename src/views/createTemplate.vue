<template>
    <div class="bgColor">
        <div class="nav">
            <div class="nav-center">
                <div class="nav-container" v-for="(item,index) in navTitle" :key="index"
                    :class="{clickClass:index==current}" @click="addClass(index)">
                    {{item.title}}
                </div>
            </div>
        </div>
        <div class="nav-content">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="审批名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="模板图标">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="选择分组">
                    <el-select v-model="form.region" placeholder="请选择分组">
                        <el-option label="假期管理" value="shanghai"></el-option>
                        <el-option label="人事管理" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动形式">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                navTitle: [{
                        title: '基础设置'
                    },
                    {
                        title: '表单设计'
                    }
                ],
                current: 0,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },

        methods: {
            addClass: function (index) {
                this.current = index;
            },
            onSubmit() {
                console.log('submit!');
            }
        },
        mounted: function () {}
    }
</script>

<style scoped>
    .nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 997;
        width: 100%;
        height: 60px;
        font-size: 14px;
        color: #fff;
        background: #3296fa;
        display: flex;
        align-items: center;
    }

    .nav-center {
        width: 300px;
        margin: auto;
    }

    .nav-container {
        cursor: pointer;
        display: inline-block;
        line-height: 60px;
        width: 150px;
        text-align: center;
        white-space: nowrap;
    }

    .clickClass {
        width: 150px;
        height: 100%;
        background: #1583f2;
    }

    .nav-content {
        width: 600px;
        border-radius: 8px;
        padding: 20px 30px;
        background: #fff;
        margin: 100px auto;
    }
</style>