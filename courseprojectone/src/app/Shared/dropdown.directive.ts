
//The below is to open downdown but if we click any where other than the button the dropdown won't close
// import { Directive, HostBinding, HostListener } from "@angular/core";

// @Directive(
//     {
//         selector:'[appDropdown]'
//     }
// )
// export class DropdownDirective{
//     @HostBinding('class.open') isOpen = false;
//   @HostListener('click') toggleopen(){
//      this.isOpen = !this.isOpen;
//   } 
// }

//Replaceing the above to make the dropdown close if we click anywhere on the screen
import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
 
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}