<template>
  <main class="wrap">
	<my-header></my-header>
    <section class="article">
      <article class="block">
		<div class="title">{{title}}</div>
		<div class="info">{{date|toDate}}</div>
        <div class="content" v-html="content"></div>
      </article>
    </section>
    <my-footer></my-footer>
  </main>
</template>

<script>
  import {mapState, mapActions, mapMutations}   from 'vuex'
  import marked       from '../../assets/js/marked.min'
  import hljs         from '../../assets/js/highlight.pack'
  import MyHeader     from './MyHeader.vue'
  import MyFooter     from './MyFooter.vue'

  export default{
    created(){
      const id = this.$route.query.id
      if (id) {
		this.getArticle(id)
      }
    },
    updated(){
      this.highlight()
    },
    methods: {
      highlight(){
        setTimeout(() => {
          hljs.initHighlighting.called = false
          hljs.initHighlighting()
        }, 0)
      },
      ...mapActions(['getArticle'])
    },
    computed: {
      content: {
        get(){
          this.highlight()
          return this.$store.state.article.content
        },
        set(value){
          this.$store.commit('UPDATE_CONTENT', value)
        }
      },
      date:{
		get(){
			return this.$store.state.article.date
		}
      },
      title: {
        get(){
		  return this.$store.state.article.title
        },
        set(value){
          this.$store.commit('UPDATE_TITLE', value)
        }
      }
    },
    components: {MyHeader, MyFooter}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../style/variables";

  .wrap {
    min-height: 100%;
    position: relative;
  }

  section.article {
    line-height: 1.6;
    padding-bottom: 160px;
    article {
      .title {
        margin: 0.65em 0;
        font-size: 1.5em;
      }
      .info {
        color: #7f8c8d;
        margin: 1.2em 0;
        span {
          margin-left: 0.5rem;
        }
      }
      .content {
        h2, h3, h4, h5, h6 {
          position: relative;
          margin: 1em 0;
          &:before {
            content: "#";
            color: $green1;
            position: absolute;
            left: -0.7em;
            top: -4px;
            font-size: 1.2em;
            font-weight: bold;
          }
        }
        h4, h5, h6 {
          &:before {
            content: ""
          }
        }
        h2, h3 {
          font-size: 22px
        }
        h4, h5, h6 {
          font-size: 18px
        }
        a {
          color: $green1;
          word-break: break-all;
        }
        blockquote {
          margin: 2em 0;
          padding-left: 20px;
          border-left: 4px solid $green1;
        }
        img {
          display: block;
          max-width: 100%;
          margin: 1em auto
        }
        code,
        pre {
          font-size: 0.8em;
          background-color: #f8f8f8;
          font-family: 'Roboto Mono', Monaco, courier, monospace;
          color: #525252;
        }
      }
    }
  }
</style>
