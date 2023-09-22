<template>
    <div :id="tagId" class="common-modal" :class="openModal ? '' : 'off'">
        <div class="common-modal-window">
            <div class="common-modal-window-inner">
                <div class="common-modal-title"></div>
                <div class="common-modal-content" style="line-height: 25px" v-html="content"></div>
            </div>
            <div class="common-modal-table">
                <div class="common-modal-btn" :style="important ? 'color: #b7b7b7;' : ''" @click="ok">
                    확인
                </div>
                <!-- <div class="common-modal-btn" :style="important ? '' : 'color: #b7b7b7;'" @click="close">
                    취소
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tagId: {
            type: String,
            default: 'inform-modal',
        },
        content: {
            type: String,
            default: '',
        },
        important: {
            type: Boolean,
            default: false,
        },
        time: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            openModal: false,
            isModal: true,
            result: null,
            reject: null,
            isOpen: false,
            modalTimeOut: null,
        }
    },
    watch: {},
    created() {},
    mounted() {
        // 모달 외 장소 클릭시 모달 닫기
        // const modal = document.getElementById('common-modal')
        // modal.addEventListener('click', (e) => {
        //     const evTarget = e.target
        //     if (evTarget.classList.contains('common-modal')) {
        //         this.close()
        //     }
        // })
    },
    methods: {
        async inform() {
            return new Promise((resolve, reject) => {
                this.modalOn()

                // result 변수에 resolve를 담아서 대기상태로 만듬.
                this.result = resolve
                // this.reject = reject

                if (this.time) {
                    this.modalTimeOut = setTimeout(() => {
                        console.log('time!!!!!!', this.isOpen)
                        // if (!this.isOpen) return
                        this.ok()
                    }, this.time * 1000)
                }
            })
        },
        modalOn() {
            this.isOpen = true
            document.querySelector(`#${this.tagId}`)?.classList.remove('off')
        },
        modalOff() {
            this.isOpen = false
            document.querySelector(`#${this.tagId}`)?.classList.add('off')
            // document.querySelector('#inform-modal')?.classList.add('off')
        },
        ok(e) {
            clearTimeout(this.modalTimeOut)
            this.modalOff()
            this.result(true)
        },
        close() {
            this.modalOff()
            this.result(false)
            // this.reject(false)
        },
    },
}
</script>

<style scoped>
.common-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2999;
}

.common-modal.off {
    display: none;
}
.common-modal-content {
    padding: 30px;
    text-align: center;
    font-weight: 700;
}

.common-modal-window {
    background-color: #fff;
    /* padding: 20px; */
    border-radius: 10px;
    /* width: 90%; */
    width: 84%;
    max-width: 400px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.common-modal-window-inner {
    position: relative;
}

.common-modal-title {
    text-align: center;
    margin-bottom: 10px;
    font-size: 1.3rem;
}

.common-modal-table {
    display: flex;
    justify-content: space-around;
}

.common-modal-btn {
    padding: 20px;
    width: 100%;
    text-align: center;
    border: 1px solid #d9d9d9;
    cursor: pointer;
}
.common-modal-table > .common-modal-btn:nth-child(1) {
    border-right: none;
    /* color: #b7b7b7; */
    border-radius: 0 0 0 10px;
}
.common-modal-table > .common-modal-btn:nth-child(2) {
    border-right: none;
    border-radius: 0 0 10px 0;
}

.common-modal-table .common-modal-btn:hover {
    background-color: #083d07;
    color: white;
    border: 1px solid #083d07;
}
.modalBtn::after {
    /* background-color: #083d07;
	color: white;
	border: 1px solid #083d07; */
}
</style>
