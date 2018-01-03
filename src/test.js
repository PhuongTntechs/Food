
        <ShareSheet visible={this.state.visible} onCancel={this.onCancel.bind(this)}>
        <Button iconSrc={{ uri: FACEBOOK_ICON }}
                onPress={() => {
                  this.onCancel();
                  this.shareLinkWithShareDialog();
                }}
        >Facebook</Button>
        <Button iconSrc={{ uri: GOOGLE_PLUS_ICON }}
                onPress={()=>{
            this.onCancel();
            setTimeout(() => {
              Share.shareSingle(Object.assign(shareOptions, {
                "social": "googleplus"
              }));
            },300);
          }}>Google +</Button>
        <Button iconSrc={{ uri: MORE_ICON }}
          onPress={()=>{
            this.onCancel();
            setTimeout(() => {
              Share.open(shareOptions)
            },300);
          }}>More</Button>
      </ShareSheet>