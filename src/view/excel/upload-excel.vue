<style lang="less">
  @import "./common.less";
</style>
<template>
  <div>
    <Card title="导入EXCEL">
      <Row>
        <p class="p-upload1">Excel上传</p>
        <Upload action :before-upload="handleBeforeUpload" accept=".xls, .xlsx" class="upload1">
          <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传Excel文件</Button>
        </Upload>
      </Row>
      <br>
      <Row>
        <p class="p-upload1">TexT上传</p>
        <Upload action :before-upload="handleBeforeUploadText" accept=".txt" class="upload1">
          <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传TexT文件</Button>
        </Upload>
      </Row>
      <br>
      <Row>
        <p class="p-upload1">Json上传</p>
        <Upload action :before-upload="handleBeforeUploadJson" accept=".json" class="upload1">
          <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传Json文件</Button>
        </Upload>
      </Row>
      <Row>
        <div class="ivu-upload-list-file" v-if="file !== null">
          <Icon type="ios-stats"></Icon>
          {{ file.name }}
          <Icon v-show="showRemoveFile" type="ios-close" class="ivu-upload-list-remove" @click.native="handleRemove()"></Icon>
        </div>
      </Row>
      <Row>
        <transition name="fade">
          <Progress v-if="showProgress" :percent="progressPercent" :stroke-width="2">
            <div v-if="progressPercent == 100">
              <Icon type="ios-checkmark-circle"></Icon>
              <span>成功</span>
            </div>
          </Progress>
        </transition>
      </Row>
    </Card>
    <Row class="margin-top-10">
      <Table :columns="tableTitle" :data="tableData" :loading="tableLoading"></Table>
    </Row>
  </div>
</template>
<script>
  import excel from "@/libs/excel";
  import jsonFile from "@/libs/json";
  export default {
    name: "upload-excel",
    data() {
      return {
        uploadLoading: false,
        progressPercent: 0,
        showProgress: false,
        showRemoveFile: false,
        file: null,
        tableData: [],
        tableTitle: [],
        tableLoading: false
      };
    },
    methods: {
      initUpload() {
        this.file = null;
        this.showProgress = false;
        this.loadingProgress = 0;
        this.tableData = [];
        this.tableTitle = [];
      },
      handleUploadFile() {
        this.initUpload();
      },
      handleRemove() {
        this.initUpload();
        this.$Message.info("上传的文件已删除！");
      },
      handleBeforeUpload(file) {
        console.log("handleBeforeUpload");
        const fileExt = file.name
          .split(".")
          .pop()
          .toLocaleLowerCase();
        if (fileExt === "xlsx" || fileExt === "xls") {
          this.readFile(file);
          this.file = file;
        } else {
          this.$Notice.warning({
            title: "文件类型错误",
            desc:
              "文件：" +
              file.name +
              "不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。"
          });
        }
        return false;
      },
      handleBeforeUploadText(file) {
        const TextExt = file.name.split(".").pop().toLocaleLowerCase();
        if (TextExt === "text") {
          this.readFile(file);
          this.file = file
        } else {
          this.$Notic.warning({
            title: "文件类型错误",
            desc:
              "文件：" +
              file.name +
              "不是Text文件，请选择后缀为.text的文本文件。"
          });
        }
      },
      handleBeforeUploadJson(file) {
        const JsonExt = file.name.split(".").pop().toLocaleLowerCase();
        if (JsonExt === "json") {
          this.readFile(file);
          this.file = file
        } else {
          this.$Notic.warning({
            title: "文件类型错误",
            desc:
              "文件：" +
              file.name +
              "不是Json文件，请选择后缀为.json的文件。"
          })
        }
      },
      // 读取文件
      readFile(file, option) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadstart = e => {
          this.uploadLoading = true;
          this.tableLoading = true;
          this.showProgress = true;
        };
        //正在读取
        reader.onprogress = e => {
          this.progressPercent = Math.round((e.loaded / e.total) * 100);
        };
        //出错
        reader.onerror = e => {
          this.$Message.error("文件读取出错");
        };
        //成功读取
        reader.onload = e => {
          this.$Message.info("文件读取成功");
          const data = e.target.result;
          if (option === "xlsx") {
            const { header, results } = excel.read(data, "array");
            const tableTitle = header.map(item => {
              return { title: item, key: item };
            });
          } else if (option === "json") {

          } else if (option === "text") {

          }

          this.tableData = results;
          this.tableTitle = tableTitle;
          this.uploadLoading = false;
          this.tableLoading = false;
          this.showRemoveFile = true;
        };
      }
    },
    created() { },
    mounted() { }
  };
</script>
