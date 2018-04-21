<template>
  <div class="preview">
    <ResumePreview></ResumePreview>
    <div class="goback" @click="goback">返回</div>
    <div class="download" @click="downPdf">下载</div>
  </div>

</template>

<script>
import ResumePreview from '@/components/ResumePreview'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import $ from 'jquery'

export default {
  name: 'preview',
  components: {
    ResumePreview
  },
  methods: {
    goback() {
      this.$router.replace('/main')
    },
    downPdf(){
      let dom = $("#resume-preview");
      html2canvas(dom[0]).then(canvas => {
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;


        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = contentWidth / 595.28 * 841.89;
        //未生成pdf的html页面高度
        var leftHeight = contentHeight;
        //页面偏移
        var position = 0;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28;
        var imgHeight = 595.28/contentWidth * contentHeight; 

        var pageData = canvas.toDataURL('image/jpeg', 1.0);
        var pdf = new jsPDF('', 'pt', 'a4');

        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
        } else {
          while(leftHeight > 0) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight;
            position -= 841.89;
            //避免添加空白页
            if(leftHeight > 0) {
              pdf.addPage();
            }
          }
        }

        pdf.save('个人报告.pdf');
      });

    }
  }}
</script>

<style lang="scss" scoped>
.preview {
  min-width: 1024px;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.goback {
  position: fixed;
  right: 100px;
  top: 20px;
  font-size: 1.5rem;
  background: #2d78f4;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;

&
:hover {
  box-shadow: 1px 1px 1px #ccc;
  border-bottom: 1px solid #ccc;
  opacity: .95;
}
}


.download {
  position: fixed;
  right: 100px;
  top: 80px;
  font-size: 1.5rem;
  background: #2d78f4;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
&:hover {
   box-shadow: 1px 1px 1px #ccc;
   border-bottom: 1px solid #ccc;
   opacity: .95;
 }
}
</style>
