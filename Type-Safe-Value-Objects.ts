/**
 * Regular type cheking might not be enough, it can cause bugs
 * which you can avoid with better testing; however, safe-typing seems
 * to lend a mesurable advantage to the design of softwares. 
 * One way of practicing safe-typing is by resorting to Value objects.
 * More on that in this thread: https://medium.com/@mail_67225/type-safe-value-objects-in-typescript-d1b119c4f5cd?source=email-7cd1b2421663-1561864681505-digest.reader------0-59------------------8c43741f_d82d_46c2_94c7_db7fa146ee9c-1&sectionName=top
 * The examples bellow have been run on "tsc -v : Version 2.7.1"
 */

 /** create a value object interface */
 interface ValueObject<T> {
     type: string; 
     value: T; 
 }

 /** use value object as an overarching type, then extend sub-types from it*/
 interface StringyValueObject extends ValueObject<string>{
     type: "Stringy"; 
 }

 /** Here's how you can create an object of StringyValueObject type */
 const stringyObject : StringyValueObject = { type: "Stringy", value: "stringyValue"}; 

/** Here's how you can accelerate the process of creating these objects */
function stringyBuilder(value: string): StringyValueObject {
    return {type: "Stringy", value}; 
}

/** Here's how you can test equality of ValueObjects */
function isEqualTo<T, V extends ValueObject<T>> (
    v1: V, 
    v2: V
    ) {
        return v1.value === v2.value; 
    }

/** Here's an example of console error when value-objects are not equal */
const v1 = stringyBuilder("v1"); 
const v2 = {type: "Stringy", value: 7}; //a rotten instantiation of stringyBuilder

isEqualTo(v1, v2); //the IDE should tell you there's an uncompatibility, but feel free to compile and fail to see it on the console
/**
 * error TS2345: Argument of type '{ type: string; value: number; }' is not assignable to parameter of type 'StringyValueObject'.
   Types of property 'type' are incompatible.
   Type 'string' is not assignable to type '"Stringy"'.
 */

 /** if you want immutable value objects */
 interface ImmutableValueObject<T> extends Readonly<{ type: string; value: T;}> {}


/** example of how the compiler might yell at you if you create an ImmutableValueObject and try to modify it */
const immValObj : ImmutableValueObject<string> = { type: "stringTyped", value: "immutableValue"}; 
immValObj.value = "change this if you can!";
/**
 * error TS2540: Cannot assign to 'value' because
   it is a constant or a read-only property.
 */