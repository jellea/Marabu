function Pattern_Controller()
{
  Controller.call(this);
  
  this.name = "Pattern";
  this.el = document.getElementById("pattern_controller");  
  this.status_el = document.getElementById("pattern_controller_status");
  this.is_selected = false;
  this.is_mod_selected = false;
  this.pattern_id = -1;

  this.selection = {x1:0,y1:0,x2:0,y2:0};

  this.select = function(id,col,row)
  {
    if(this.pattern_id == -1){ GUI.update_status("<span class='error'>No pattern selected!</span>"); return; }
    GUI.deselect_all();
    
    if(id < 0){ return; }

    this.el.setAttribute("class","pattern edit");
    this.status_el.innerHTML = this.pattern_id+" "+col+":"+row;
    this.is_selected = true;
    GUI.update_status("Editing Pattern");
  }

  this.deselect = function()
  {
    this.el.setAttribute("class","pattern");
    this.status_el.innerHTML = "";
    this.is_selected = false;
  }

  this.select_pattern = function(pattern_id)
  {
    this.pattern_id = pattern_id;

    if(this.pattern_id == -1){
      this.el.setAttribute("class","pattern inactive");
    }
    else{
      this.status_el.innerHTML = this.pattern_id;
    }
  }

  this.edit_pattern = function(pattern_id,col = 0,row = 0)
  {
    if(pattern_id < 0){ return; }

    GUI.deselect_all();

    this.pattern_id = pattern_id;
    this.el.setAttribute("class","pattern edit");
    this.status_el.innerHTML = this.pattern_id+" "+col+":"+row;
    this.is_selected = true;
    GUI.update_status("Editing Pattern "+this.pattern_id);
  }

  // MOD

  this.select_mod = function(o,row)
  {
    GUI.deselect_all(); 
    this.is_mod_selected = true;
    o.setAttribute("class","edit");
  }

  this.deselect_mod = function()
  {
    this.is_mod_selected = false;
    GUI.select_mod_row(null); 
  }

  /* ===================================
  @  Keyboard
  ====================================*/

  // Controls
  this.key_letter_c = function(){ GUI.pattern_copy();  }
  this.key_letter_v = function(){ GUI.pattern_paste(); }
  // Brackets
  this.key_square_bracket_right = function(){ GUI.pattern_octave_up();  }
  this.key_square_bracket_left  = function(){ GUI.pattern_octave_down();  }
  this.key_curly_bracket_right  = function(){ GUI.pattern_note_up();  }
  this.key_curly_bracket_left   = function(){ GUI.pattern_note_down();  }
  // Keyboard Notes
  this.key_letter_a = function(){ GUI.keyboard_play(0);  }
  this.key_letter_s = function(){ GUI.keyboard_play(2);  }
  this.key_letter_d = function(){ GUI.keyboard_play(4);  }
  this.key_letter_f = function(){ GUI.keyboard_play(5);  }
  this.key_letter_g = function(){ GUI.keyboard_play(7);  }
  this.key_letter_h = function(){ GUI.keyboard_play(9);  }
  this.key_letter_j = function(){ GUI.keyboard_play(11); }
  // Keyboard Notes sharp
  this.key_letter_w = function(){ GUI.keyboard_play(1);  }
  this.key_letter_e = function(){ GUI.keyboard_play(3);  }
  this.key_letter_t = function(){ GUI.keyboard_play(6);  }
  this.key_letter_y = function(){ GUI.keyboard_play(8);  }
  this.key_letter_u = function(){ GUI.keyboard_play(10); }
  // Controls up/down
  this.key_letter_x = function(){ GUI.keyboard_octave_up(); }
  this.key_letter_z = function(){ GUI.keyboard_octave_down(); }

  // Arrows
  this.key_arrow_up    = function()
  {
    if(this.selection.y1 < 1){ return; }
    GUI.select_pattern_cell(this.selection.x1,this.selection.y1-1);
    this.selection.y1 -= 1;
    this.select(null,this.selection.x1,this.selection.y1);
  }

  this.key_arrow_down  = function()
  {
    GUI.select_pattern_cell(this.selection.x1,this.selection.y1+1);
    this.selection.y1 += 1;
    this.select(null,this.selection.x1,this.selection.y1);
  }

  this.key_arrow_left  = function()
  { 
    if(this.selection.x1 < 1){ return; }
    GUI.select_pattern_cell(this.selection.x1-1,this.selection.y1);
    this.selection.x1 -= 1;
    this.select(null,this.selection.x1,this.selection.y1);
  }

  this.key_arrow_right = function()
  {
    if(this.selection.x1 > 2){ return; }
    GUI.select_pattern_cell(this.selection.x1+1,this.selection.y1);
    this.selection.x1 += 1;
    this.select(null,this.selection.x1,this.selection.y1);
  }

  this.key_escape = function()
  {
    GUI.stop_audio();
    GUI.pattern_controller.deselect_mod();
    GUI.deselect_all();
  }
}