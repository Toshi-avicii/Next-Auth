function UserProfile({ params }: any) {
    return (
      <div>
          <h1>Profile</h1>
          <hr />
          <p className="text-4xl">Profile page {params.userId}</p> 
      </div>
    )
}
  
  export default UserProfile
  