<template>
    <div class="thing-details-container">
        <div class="thing-details">
            <h1>More Details</h1>
            <div class="thing-details__stack">
                <div class="thing-details__group left">
                    <div class=thing-info>
                        <div class="avatar">
                            <img
                            src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                                alt="John"
                                >
                        </div>
                        <div> 
                            <div class="thing-details-name">
                                Name: {{ thing.name }}
                            </div>
                            <div class="thing-details-id">
                                ID: {{ thing.userId }}
                            </div>
                        </div>
                    </div>
                    <div class="thing-details-keys">
                        <span>Keywords:</span>
                            <div class="keywords">
                                <span 
                                v-for="keyword in thing.tags"
                                :key="keyword"
                                class="keyword"
                            >
                                {{ keyword }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="thing-details__group middle typography-about">
                    <div class="typography-about__header">
                        <i class="material-icons">person</i>
                        <h1>A short description</h1>
                    </div>
                    <div class="typography-about__description">
                        <p>{{ thing.description }}</p>
                    </div>
                </div>
                <div class="thing-details__group right">
                    <div class="icon-button">
                        <slot name="editButton" />
                    </div>
                </div>
            </div>
            <slot name="editForm" />   
        </div>
    </div>
</template>

<script>
export default {
    name: "ThingDetail",
    props: ["thing"]
}
</script>

<style lang="scss" scoped>
    .button {
         display: inline-flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        position: relative;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        background-color: transparent;
        outline: 0px;
        margin: 0px;
        cursor: pointer;
        user-select: none;
        vertical-align: middle;
        appearance: none;
        text-decoration: none;
        font-family: Roboto, Helvetica, Arial, sans-serif;
    }
    .thing-details-container {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 2;
    }
    .thing-details {
        display: flex;
        flex-direction: column;
        background: linear-gradient(to right bottom, rgb(0, 127, 255), rgb(0, 89, 178) 120%);
        color: #fff;
        animation: slide-in 1s ease-in;
        padding: 20px;

        @keyframes slide-in {
            0% {
                transform: translateY(-20%);
            }
            50% {
                transform: translateY(1.88%);
            }
            100% {
                transform: translateY(0);
            }
        }
        &__stack {
            display: flex;
            padding-bottom: 20px;
        }

        &__group {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }
        &__group:nth-child(1) {
            width: 20%;
        }
         &__group:nth-child(2) {
            width: 60%;
        }
         &__group:nth-child(3) {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20%;
            
            .icon-button {
                display: flex;
                justify-content: center;
            }
        }
        .typography-about {
            color: rgb(255, 255, 255);
            transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            border-radius: 10px;
            border: 1px solid rgb(41, 148, 255);
            background-image: none;
            display: block;
            background-color: rgb(19, 116, 212);
            padding: 20px;
            height: 100%;

            &__header {
                display: flex;
                -webkit-box-align: center;
                align-items: center;
                margin-bottom: 10px;
                
                i {
                    color: #40c3a5;
                }
                h1 {
                    margin: 0px 0px 0px 10px;
                    font-size: 0.875rem;
                    line-height: 1.5;
                    letter-spacing: 0px;
                    font-weight: 700;
                    color: rgb(255, 255, 255);
                }
            }
            &__description {
                p {
                    margin: 0px;
                    font-size: 0.875rem;
                    line-height: 1.5;
                    letter-spacing: 0px;
                    font-weight: 400;
                    color: rgb(225, 228, 231);
                    text-align: initial;
                }
            }
        }
        .avatar {
            position: relative;
            height: 50px;
            width: 50px;
            overflow: hidden;
            border: 2px solid #fff;
            border-radius: 50%;
            margin-right: 5px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                vertical-align: middle;
                border-radius: 8px;
            }
        }
        .thing-details-keys {
            display: flex;
            padding: 8px;
            flex-direction: column;
            
            span {
                text-align: left;
            }
            .keywords {
                display: inline-flex;

                .keyword {
                    font-size: 0.8rem;
                    border: 1px solid rgb(231, 231, 231);
                    border-radius: 5px;
                    padding: 2px 8px;
                    margin: 5px 5px 5px 0;
                }
            }
        }
        .thing-info {
            display: flex;

            div:nth-child(2){
                text-align: left;
            }
            .thing-details-id {
                font-size: 0.8rem;
                margin-top: 5px;
            }
        }
        .thing-details-name {
            font-weight: bolder;
        }
        .edit-button {
            border: none;
            color: white;
            padding: 5px !important;

            &:hover {
                background-color: rgb(7, 118, 228) !important;
                border: 1px solid rgb(126, 191, 255);
            }
        }
    }
</style>