
<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal__backdrop" @click="closeModal()"/>
      <div class="modal__dialog">
        <div class="modal__header">
          <slot name="header"/>
          <button type="button" class="modal__close" @click="closeModal()">
            <i class="material-icons">close</i>
          </button>
        </div>

        <div class="modal__body">
          <slot name="body"/>
        </div>

        <div class="modal__footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      show: false
    };
  },
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
    }
  }
};
</script>


<style lang="scss" scoped>
.modal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  
    &__backdrop {
        background-color: rgb(10, 25, 41);
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
    }
    &__dialog {
        background-color: rgb(10, 25, 41);
        position: relative;
        width: 600px;
        margin: 50px auto;
        display: flex;
        flex-direction: column;
        border-width: 1px 0px;
        border-style: solid;
        border-color: rgba(255, 255, 255, 0.1);
        border-image: initial;
        border-radius: 10px;
        border-left-width: 1px;
        border-right-width: 1px;
        z-index: 2;
        @media screen and (max-width: 992px) {
            width: 90%;
        }
    }
    &__close {
        background: transparent;
        width: 30px;
        height: 30px;
        border: none;
        outline: 0;
        text-decoration: none;
        cursor: pointer;

        i {
            color: white;
        }
    }
    &__header {
        padding: 20px 20px 10px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }
    &__body {
        padding: 10px 20px 10px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    &__footer {
        padding: 10px 20px 20px;
    }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>