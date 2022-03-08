<template>
    <div class="thing-list">
        <modal ref="modalName">
            <template v-slot:header>
                <h1>Add Thing</h1>
            </template>

            <template v-slot:body>
                <div class="form form-root">
                    <div>
                        <div class="field formControl-root">
                            <label class="input-label" for="outlined-text">Title</label>
                            <div class="inputbase-root">
                                <input type="text" v-model="title" id="outlined-text" class="input" placeholder="Example Title"/>
                                <fieldset aria-hidden="true">
                                    <legend>
                                        <span>Title</span>
                                    </legend>
                                </fieldset>
                            </div>
                        </div>
                        <div class="field formControl-root">
                            <label class="input-label" for="outlined-text">Name</label>
                            <div class="inputbase-root">
                                <input type="text" v-model="name" id="outlined-text" class="input" placeholder="Example Name"/>
                                <fieldset aria-hidden="true">
                                    <legend>
                                        <span>Name</span>
                                    </legend>
                                </fieldset>
                            </div>
                        </div>
                        <div class="field formControl-root">
                            <label class="input-label" for="outlined-text">ID</label>
                            <div class="inputbase-root">
                                <input type="number" v-model="userId" id="outlined-text" class="input" placeholder="Example ID"/>
                                <fieldset aria-hidden="true">
                                    <legend>
                                        <span>ID</span>
                                    </legend>
                                </fieldset>
                            </div>
                        </div>
                        <div class="field formControl-root">
                            <label class="input-label" for="outlined-text">Description</label>
                            <div class="inputbase-root">
                                <input type="text" v-model="description" id="outlined-text" class="input" placeholder="Example Description"/>
                                <fieldset aria-hidden="true">
                                    <legend>
                                        <span>Description</span>
                                    </legend>
                                </fieldset>
                            </div>
                        </div>
                        <div class="field formControl-root">
                            <label class="input-label" for="outlined-text">Tags</label>
                            <div class="inputbase-root">
                                <input type="text" v-model="tags" id="outlined-text" class="input" placeholder="Example Tags"/>
                                <fieldset aria-hidden="true">
                                    <legend>
                                        <span>Tags</span>
                                    </legend>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>    
            </template>

            <template v-slot:footer>
                <div class="buttons-root">
                    <button class="button-root outlined-primary-btn" @click="$refs.modalName.closeModal()">Cancel</button>
                    <button class="button-root contained-primary-btn" @click="addThing">Save</button>
                </div>
            </template>
        </modal>
        <button class="button button-refresh" @click="fetchList"><i class="material-icons">refresh</i>Refresh</button>
        <div v-if="hasThings" class="thing-list-item-container">
            <div 
                v-for="(thing, index) in things" 
                :key="index"
                class="thing-list-item"
                :class="{'item-flagged' : isFlagged(thing._id)}"
                @click="selectThing(thing._id)"
            >
                <div class="columns">
                    <div class="column left">
                        <p class="thing-title">{{ thing.title }}</p>
                        <span class="date">{{ formatDate(thing.date) }}</span>
                    </div>
                    <div class="column buttons">
                        <button class="button" @click.stop="removeThing(thing, index)">
                            <span class="icon"><i class="material-icons icon" title="Remove">close</i></span>
                        </button>
                        <button class="button" @click.stop="flagThing(thing._id)">
                            <span class="icon"><i class="material-icons" title="Flag">{{ isFlagged(thing._id) ? 'check' : 'flag' }}</i></span>
                        </button>
                    </div>
                </div>
                 <thing-detail 
                        v-if="isSelected(thing._id)"
                        :thing="thing
                ">
                    <template v-slot:editButton>
                        <button class="button edit-button" @click.stop="selectToEdit(thing)">
                            <i class="material-icons">edit</i>
                        </button>
                    </template>
                    <template v-slot:editForm>
                        <div class="form form-root form-root__edit" v-if="isSelectedToEdit(thing)">
                            <div class="edit-form">
                                <div class="field formControl-root">
                                    <label class="input-label" for="outlined-text">Title</label>
                                    <div class="inputbase-root">
                                        <input type="text" v-model="editedTitle" @click.stop="" id="outlined-text" class="input" placeholder="Example Title"/>
                                        <fieldset aria-hidden="true">
                                            <legend>
                                                <span>Title</span>
                                            </legend>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="field formControl-root">
                                    <label class="input-label" for="outlined-text">Name</label>
                                    <div class="inputbase-root">
                                        <input type="text" v-model="editedName" @click.stop="" id="outlined-text" class="input" placeholder="Example Name"/>
                                        <fieldset aria-hidden="true">
                                            <legend>
                                                <span>Name</span>
                                            </legend>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="field formControl-root">
                                    <label class="input-label" for="outlined-text">ID</label>
                                    <div class="inputbase-root">
                                        <input type="number" v-model="editedId" @click.stop="" id="outlined-text" class="input" placeholder="Example ID"/>
                                        <fieldset aria-hidden="true">
                                            <legend>
                                                <span>ID</span>
                                            </legend>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="field formControl-root">
                                    <label class="input-label" for="outlined-text">Description</label>
                                    <div class="inputbase-root">
                                        <input type="text" v-model="editedDescription" @click.stop="" id="outlined-text" class="input" placeholder="Example Description"/>
                                        <fieldset aria-hidden="true">
                                            <legend>
                                                <span>Description</span>
                                            </legend>
                                        </fieldset>
                                    </div>
                                </div>
                                <div class="buttons-root">
                                    <button class="button-root outlined-primary-btn" @click="$refs.modalName.closeModal()">Cancel</button>
                                    <button class="button-root contained-primary-btn" @click.stop="updateItem(thing, index)">Save</button>
                                </div>
                            </div>
                        </div> 
                    </template>
                </thing-detail>
            </div>
        </div>
        <div v-else class="thing-list-item no-item">
            <p>There are no things.</p>
        </div>
        <div class="add-item">
            <button class="button add-item-btn" @click="$refs.modalName.openModal()">
                <span class="icon"><i class="material-icons">add</i></span>
            </button>
        </div>
    </div>
</template>

<script>
import ThingDetail from './ThingDetail.vue';
import Modal from './Modal.vue';
import axios from 'axios';

export default {
	components: { ThingDetail, Modal },
    name: "ThingList",
    
    data() {
        return {
            things: [],
            flagged: [],
            title: "",
            name: "",
            userId: "",
            description: "",
            tags: [],
            selectedId: null,
            editedTitle: "",
            editedName: "",
            editedId: "",
            editedDescription: "",
            selectedToEdit: {}
        }
    },
    mounted() {
        this.fetchList()
    },
    computed: {
        hasThings() {
            return this.things.length > 0
        }
    },
    methods: {
        async addThing() {
            this.strToArray();
            const response = await axios.post('/api/listThings/', {
                title: this.title,
                name: this.name,
                userId: this.userId,
                description: this.description,
                tags: this.tags
            })
            this.things.push(response.data);
            this.title = "";
            this.name = "";
            this.userId = "";
            this.description = "";
            this.tags = [];
        },
        strToArray() {
            return [this.tags.trim().split(" ")];
        },
        async removeThing(item, i) {
            await axios.delete('/api/listThings/'+ item._id);
            this.things.splice(i, 1);
        },
        async flagThing(_id) {
            if (this.isFlagged(_id)) {
                this.flagged = this.flagged.filter( i => i !== _id)
                await axios.put('/api/listThings/flag/' + _id, {
                    flagged: "no"
                })
            } else {
                this.flagged.push(_id)
                await axios.put('/api/listThings/flag/' + _id, {
                    flagged: "yes"
                });
            }
        },
         
        isFlagged(_id) {
            // const response = await axios.get('/api/listThings/singleThing/' + _id);
            // const thing = response.data;
            // const isFlagged = thing.flagged;
            // if(isFlagged === "yes") {
            //     return true;
            // } else { 
            //     return false;
            // }
            return this.flagged.includes(_id);
        },
        selectToEdit(thing) {
            this.selectedToEdit = thing;
            this.editedTitle = thing.title;
            this.editedName = thing.name;
            this.editedId = thing.userId;
            this.editedDescription = thing.description;
            
        },
        unselect() {
            this.selectedToEdit = {};
            this.editedTitle = "";
            this.editedName = "";
            this.editedId = "";
            this.editedDescription = "";
        },
        selectThing(_id) {
            this.selectedId = this.isSelected(_id) ? null : _id
        },
        isSelected(_id) {
            return this.selectedId === _id
        },
        isSelectedToEdit(thing) {
            return thing._id === this.selectedToEdit._id;
        },  
        async fetchList() {
            const response = await axios.get('/api/listThings/');
            this.things = response.data;
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(date);
        },
        async updateItem(thing, i) {
            const response = await axios.put('/api/listThings/' + thing._id, {
                title: this.editedTitle,
                name: this.editedName,
                userId: this.editedId,
                description: this.editedDescription
            })
            this.things[i] = (response.data);
            this.unselect();
        }
    }
}
</script>

<style lang="scss" scoped>
    .thing-list {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 18px;
        justify-content: center;
        align-items: center;
        min-width: 400px;
        max-width: 512px;
        height: fit-content;
        border: 1px solid black;
        background: rgb(10, 25, 41);
        border: 1px solid rgba(144, 202, 249, 0.5);
        border-radius: 10px;
        
        .date {
            font-size: 0.7rem;
            color: rgb(86, 125, 163);
        }
        .thing-list-item-container {
            width: -webkit-fill-available;
        }
        .button-refresh {
            width: 100% !important;
            height: 100% !important;
            background-color: rgb(117, 156, 197) !important;
            
            &:hover {
                background-color: rgb(117, 156, 197);
            }
        }
        .buttons {
            right: 0;
            display: flex;
            flex-direction: column;

        }
        .button {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 25rem;
            border: none;
            outline: none;
            margin-bottom: 0.5rem;
            padding: 0.2rem;
            cursor: pointer;
            background: transparent;
            width: 30px;
            height: 30px;
            
            &:hover {
                background-color: rgb(10, 25, 41);
            }
            .icon {
                display: flex;
                color: rgb(178, 186, 194);
                background: transparent;
                
                i {
                    font-size: 1.1rem;
                }
            }
        }
        .thing-list-item {
            display: flex;
            flex-direction: column;
            padding: 8px;
            margin-top: 5px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);

            &:hover {
                background:rgb(25, 52, 80);;
                border-radius: 5px;
            }
        }
        .thing-list-item.no-item {
            width: -webkit-fill-available;
        }
        .columns {
            position: relative;
            display:flex;
            flex-direction: row;
            
            .thing-title {
                text-align: left;
                color: rgb(144, 202, 249);
            }
            .column.left {
                width: 95%;
                display: flex;
                flex-direction: column;
                justify-content: left;
                align-items: flex-start;
            }
        }
        .item-flagged {
            background-color: rgb(211, 47, 47);
            border-radius: 5px;
            margin-top: 5px;

            .thing-title {
                color: white !important;
            }
            &:hover {
                background:rgb(211, 47, 47);
            }
            .date {
                font-size: 0.7rem;
                color: rgb(230, 238, 246);
        }
        }
        .add-item {
            position: absolute;
            bottom: -33.888px;
            display: flex;
            justify-content: center;

            .add-item-btn {
                background-color: rgb(245, 124, 0) !important;

                .icon {
                    display: flex;
                    color: #fff;
                    background: transparent;
                
                    i {
                        font-size: 1rem;
                    }
                }
            }
        }
    }
    .form {

        .field {
            margin: 20px 0 !important;
            // width: 48ch;
            width: 100%;
            flex-direction: column;
            position: relative;
            min-width: 0;
            padding: 0;
            margin: 0;
            border: 0;
            vertical-align: top;

            .input-label {
                color: rgba(255, 255, 255, 0.7);
                font-family: Roboto, Helvetica, Arial, sans-serif;
                font-weight: 400;
                font-size: 0.9rem;
                line-height: 1.4375em;
                letter-spacing: 0.00938em;
                padding: 0px;
                display: block;
                transform-origin: left top;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: calc(100% - 24px);
                position: absolute;
                left: 0px;
                top: 0px;
                transform: translate(14px, -9px) scale(0.75);
                transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
                z-index: 1;
                pointer-events: auto;
                user-select: none;
            }
        }
        .inputbase-root {
            font-family: Roboto, Helvetica, Arial, sans-serif;
            font-weight: 400;
            font-size: 0.9rem;
            line-height: 1.4375em;
            letter-spacing: 0.00938em;
            color: rgb(255, 255, 255);
            box-sizing: border-box;
            width: 100%;
            cursor: text;
            display: inline-flex;
            -webkit-box-align: center;
            align-items: center;
            position: relative;
            border-radius: 4px;

            .input {
                font: inherit;
                letter-spacing: inherit;
                color: currentcolor;
                border: 0px;
                box-sizing: content-box;
                background: none;
                height: 1.2375em;
                margin: 0px;
                -webkit-tap-highlight-color: transparent;
                display: block;
                min-width: 0px;
                width: 100%;
                animation-name: mui-auto-fill-cancel;
                animation-duration: 10ms;
                padding: 16.5px 14px;
            }
            .input:focus {
                outline: 0
            }
            fieldset {
                text-align: left;
                position: absolute;
                inset: -5px 0px 0px;
                margin: 0px;
                padding: 0px 8px;
                pointer-events: none;
                border-radius: inherit;
                border-style: solid;
                border-width: 1px;
                overflow: hidden;
                min-width: 0%;
                border-color: rgba(255, 255, 255, 0.23);

                legend {
                    float: unset;
                    overflow: hidden;
                    display: block;
                    width: auto;
                    padding: 0;
                    height: 11px;
                    font-size: 0.75em;
                    visibility: hidden;
                    max-width: 100%;
                    -webkit-transition: max-width 100ms cubic-bezier(0.0, 0, 0.2, 1) 50ms;
                    transition: max-width 100ms cubic-bezier(0.0, 0, 0.2, 1) 50ms;
                    white-space: nowrap;

                    span {
                        padding-left: 5px;
                        padding-right: 5px;
                        display: inline-block;
                    }
                }
            }
        }

    }
    .button-root {
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
        font-weight: 500;
        font-size: 0.775rem;
        line-height: 1.75;
        letter-spacing: 0.02857em;
        text-transform: uppercase;
    }
    .outlined-primary-btn {
        min-width: 64px;
        padding: 5px 15px;
        border-radius: 4px;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        border: 1px solid rgba(144, 202, 249, 0.5);
        color: rgb(144, 202, 249);
    }
    .contained-primary-btn {
        border: 0;
        min-width: 64px;
        padding: 6px 16px;
        border-radius: 4px;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        color: rgba(0, 0, 0, 0.87);
        background-color: rgb(144, 202, 249);
        box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    }
    .buttons-root {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        button:nth-child(2) {
            margin-left: 8px;
        }
    } 
    .form-root__edit {
        display: flex;
        justify-content: center;
    }
    .edit-form {
        width: 60%;

        #outlined-text {
            color: white !important;
        }
    }
</style>