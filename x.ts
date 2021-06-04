class Test {

  private readonly client = "abc"


  public create():string{
    return "a"
  }

  public toJson():string {
    return JSON.stringify({
      
    })


  }

}





console.log(JSON.stringify(new Test()))
