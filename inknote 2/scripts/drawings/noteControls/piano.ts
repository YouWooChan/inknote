﻿module Inknote.Drawing {

    export class Piano implements IDrawable {

        ID = getID();
        x = 0;
        y = 500;
        width = 500;
        height = 100;
        order = 200;
        hover: boolean;
        select: boolean;

        leftHover: boolean = false;
        rightHover: boolean = false;

        octave: number = 4;

        isOver(x: number, y: number) {

            var result = y > this.y && y < this.y + this.height;

            this.leftHover = false;
            this.rightHover = false;

            if (result) {

                if (x < this.width / 9) {
                    this.leftHover = true;
                }

                if (x > this.width * 8 / 9) {
                    this.rightHover = true;
                }
            }

            return result;

        }

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

            ctx.beginPath();

            ctx.fillStyle = Colours.white;
            ctx.strokeStyle = Colours.black;

            ctx.rect(this.x, this.y, this.width, this.height);

            ctx.fill();
            ctx.stroke();

            for (var i = 1; i < 9; i++) {
                ctx.beginPath();
                ctx.strokeStyle = Colours.black;

                ctx.moveTo(this.width * i / 9, this.y);
                ctx.lineTo(this.width * i / 9, this.y + this.height);
                ctx.stroke();

                if (i == 1 && this.leftHover) {
                    ctx.beginPath();
                    ctx.fillStyle = Colours.orange;
                    ctx.rect(0, this.y, this.width / 9, this.height);
                    ctx.fill();
                }
                
                if (i == 8 && this.rightHover) {
                    ctx.beginPath();
                    ctx.fillStyle = Colours.orange;
                    ctx.rect(this.width * 8 / 9 , this.y, this.width / 9, this.height);
                    ctx.fill();
                }

                if (i == 2 || i == 3 || i == 5 || i == 6 || i == 7) {
                    ctx.beginPath();
                    ctx.fillStyle = Colours.black;
                    ctx.rect(this.width * i / 9 - this.width / 24, this.y, this.width / 12, this.height / 2);
                    ctx.fill();
                }
            }

            ctx.strokeStyle = Colours.black;

            // left arrow
            ctx.beginPath();
            ctx.moveTo(this.width / 15, this.y + this.height * 3 / 4);
            ctx.lineTo(this.width / 20, this.y + this.height / 2);
            ctx.lineTo(this.width / 15, this.y + this.height / 4);
            ctx.stroke();

            // right arrow
            ctx.beginPath();
            ctx.moveTo(canvas.width - this.width / 15, this.y + this.height * 3 / 4);
            ctx.lineTo(canvas.width - this.width / 20, this.y + this.height / 2);
            ctx.lineTo(canvas.width - this.width / 15, this.y + this.height / 4);
            ctx.stroke();

            // text
            ctx.beginPath();
            ctx.textAlign = "center";
            ctx.fillStyle = Colours.orange;
            ctx.font = (Math.min((this.width / 20), this.height / 4)) + "px Arial";
            ctx.fillText("C" + this.octave, this.width * 1 / 6, this.y + this.height * 3 / 4);

            return true;
        }

        click(e: MouseEvent) {

            if (e.clientX < this.width / 9) {
                this.octave--;
            }

            if (e.clientX > this.width * 8 / 9) {
                this.octave++;
            }

        }

        constructor() {

        }

    }

} 