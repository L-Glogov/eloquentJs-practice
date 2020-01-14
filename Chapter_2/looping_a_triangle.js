/*

"The instructions are excerpts from Marjin's Haverbeke excellent book: "Eloquent Javascript" 3rd Edition. The code, unless stated otherwise, is my own (L-Glogov) atempt at solving these exercises.

Write a loop that makes seven calls to console.log to output the following triangle:

#
##
###
####
#####
######
#######
"
*/

for (let i = "#"; i.length < 8; i +="#") {
  console.log(i);
}
