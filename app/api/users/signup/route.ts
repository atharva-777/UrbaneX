import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const {username,email,password} = reqBody
        console.log("reqBody ",reqBody)

        // check if user exists

        const user = await User.findOne({email})
        if(user){
            console.log('alredy exist')
            return NextResponse.json({error:"User already exists"},{status:400})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const solved:Array<number> = []
       const newUser =  new User({ 
            username,
            email,
            password: hashedPassword,
            solved
        })
    const savedUser = await newUser.save()
    // console.log("savedUser ",savedUser)
    return NextResponse.json({message:'User saved successfully',success:true,savedUser})
    
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}
